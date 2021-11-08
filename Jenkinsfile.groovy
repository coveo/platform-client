#!groovy

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import java.net.URLEncoder;

if (currentBuild.rawBuild.getCauses().toString().contains('BranchIndexingCause')) {
  print "INFO: Build skipped due to trigger being Branch Indexing"
  return
}

library identifier: 'jsadmin_pipeline@next', retriever: modernSCM([
  $class: 'GitSCMSource',
  remote: 'git@bitbucket.org:coveord/jsadmin_pipeline.git',
  credentialsId: 'coveo-bitbucket-rd-ssh'
])

pipeline {

  agent { label "build && docker && linux" }

  environment {
    NPM_TOKEN = credentials("npmjs_com_token")
    GIT = credentials("github-coveobot")
    GH_TOKEN = credentials("github-commit-token")
  }

  options {
    ansiColor("xterm")
    timestamps()
    disableConcurrentBuilds()
    timeout(time: 60, unit: 'MINUTES')
  }

  stages {
    stage('Prepare') {
      steps {
        script {
          setLastStageName();

          NEW_VERSION = ""
          SCOPE = ""

          sh "mkdir -p ${env.BRANCH_NAME}"
          checkout([
            $class: 'GitSCM',
            branches: scm.branches,
            extensions: scm.extensions + [[$class: "CleanCheckout"]] + [[$class: "LocalBranch", localBranch: "**"]] + [[$class: 'CloneOption', noTags: false, reference: '', shallow: false]],
            userRemoteConfigs: [[credentialsId: "github-coveobot", url: "https://github.com/coveo/platform-client.git"]]
          ])

          sh "git config --global user.email \"jenkins@coveo.com\""
          sh "git config --global user.name \"Jenkins CI\""
          sh "git remote set-url origin \"https://x-access-token:${env.GH_TOKEN_PSW}@github.com/coveo/platform-client.git\""

          def nodeHome = tool name: env.BUILD_NODE_VERSION, type: "nodejs"
          env.PATH = "${nodeHome}/bin:${env.PATH}"
          sh "npm config set //registry.npmjs.org/:_authToken=${env.NPM_TOKEN}"
          sh "npm ci"
        }
      }
    }

    stage('Analyse Commits') {
      steps {
        script {
          if (env.CHANGE_TARGET) {
            sh "node_modules/.bin/commitlint --from `git rev-parse origin/${env.CHANGE_TARGET}` --to ${env.GIT_COMMIT}"
          } else {
            println "No commit analysis on branch master, proceeding with the build."
          }
        }
      }
    }

    stage('Build') {
      steps {
        script {
          setLastStageName();
          sh "npm run build"
        }
      }
    }

    stage('Test') {
      steps {
        script {
          setLastStageName();
          sh "npm test"
        }
      }
    }

    stage('Publish') {
      when {
        expression { env.BRANCH_NAME ==~ /(master|fix\/create-release)/ }
      }
      
      steps {
        script {
          setLastStageName();
          sh "git fetch origin ${env.BRANCH_NAME}"
          REMOTE = "origin/" + env.BRANCH_NAME
          COMMITS_BEHIND = sh(
            script: "git rev-list --count \"$REMOTE...${env.BRANCH_NAME}\"",
            returnStdout: true
          ).trim().toInteger()

          if (COMMITS_BEHIND == 0) {
            STARTED_BY_USER = cause.user()
            STARTED_BY_UPSTREAM = cause.upstream()

            sh "npm run release"
          } else {
            sh "echo \"skipping publish since remote changed (something was merged)\""
          }
        }
      }
    }
  }

  post {
    failure {
      script {
        def color = "FF0000";
        def message = "Build FAILED at stage *${getLastStageName()}* - ${env.JOB_NAME} (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)";

        notify.sendSlackWithThread(
            color: color, message: message,
            ["admin-ui-builds"]
        )
      }
    }
    always {
      script {
        deleteDir()
      }
    }
  }
}

void setLastStageName() {
  script {
    LAST_STAGE_NAME = env.STAGE_NAME
  }
}

def getLastStageName() {
  def stage = env.STAGE_NAME
  try {
    stage = LAST_STAGE_NAME
  } catch (e) {}
  return stage
}