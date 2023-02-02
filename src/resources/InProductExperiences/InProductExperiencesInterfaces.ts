import {RestTokenParams} from '../Search/index.js';
import {CSSResourceModel, JavaScriptResourceModel} from '../SearchPages/index.js';

export interface SharedInProductExperienceModel {
    /**
     * The unique name of the search page.
     *
     * string
     * example: My_Page
     */
    name: string;

    /**
     * The search page HTML title tag value.
     *
     * string
     * example: My page
     */
    title: string;
}

export interface InProductExperienceModel extends SharedInProductExperienceModel {
    /**
     * The button.
     */
    button: IPXButtonModel;

    /**
     * The HTML body content of the widget's page.
     *
     * string
     * example: <main><h1>My page</h1></main>
     */
    content: string;

    /**
     * Whether or not this InAppWidget has a search token.
     *
     * boolean
     * default: true
     * example: true
     */
    hasToken: boolean;

    /**
     * The HTML head content of the widget's page.
     */
    header: {
        /**
         * The CSS resources of the widget.
         */
        css: CSSResourceModel[];

        /**
         * The JavaScript resources of the widget.
         */
        javascript: JavaScriptResourceModel[];
    };

    /**
     * The unique identifier of the search page.
     *
     * string
     * example: 12b627f9-e3aa-49db-a0f5-5c0c1392e59e
     */
    id: string;

    /**
     * The time at which the search page was last modified.
     *
     * string
     * example: 2019-10-31T20:17:35-04:00
     */
    lastModified: string;

    /**
     * The unique identifier of the parent Coveo Cloud organization.
     *
     * string
     * example: mycoveocloudv2organizationg8tp8wu3
     */
    orgId: string;

    token: RestTokenParams;
}

export interface CreateUpdateInProductExperienceModel extends SharedInProductExperienceModel {
    /**
     * The CSS classes of the button.
     *
     * default: btn mod-primary
     * example: myframework-button myframework-button-blue
     */
    buttonCSSClasses?: string;

    /**
     * The value of the button CSS background-color property.
     *
     * string
     * example: #2a2aa2
     */
    buttonColor?: string;

    /**
     * The value of the button CSS font-family property.
     *
     * string
     * example: 'Courier New', Courier, monospace
     */
    buttonFont?: string;

    /**
     * The value of the button CSS font-size property.
     *
     * string
     * example: 24px
     */
    buttonFontSize?: string;

    /**
     * The stringified HTML icon of the button.
     *
     * string
     * example: '<svg><circle/></svg>'
     */
    buttonIcon?: string;

    /**
     * The horizontal alignment of the button.
     *
     * string
     * default: right
     * example: center
     */
    buttonPositionHorizontal?: ButtonPositionHorizontalRequestModel;

    /**
     * The vertical alignment of the button.
     *
     * string
     * default: bottom
     * example: middle
     */
    buttonPositionVertical?: ButtonPositionVerticalRequestModel;

    /**
     * The selector corresponding to a DOM element that should open the in-app search page when clicked.
     *
     * string
     * example: .in-app-portal-target
     */
    buttonTargetSelector?: string;

    /**
     * The value of the button CSS color property.
     *
     * string
     * example: #e0e0e0
     */
    buttonTextColor?: string;

    /**
     * The constant query expression ('cq') to apply when executing search requests with the token.
     * See: https://docs.coveo.com/en/179/
     *
     * string
     * example: @source==KnowledgeBase
     */
    filter?: string;

    /**
     * The name of the query pipeline to enforce when executing search requests with the token.
     *
     * string
     * example: InternalSearch
     */
    queryPipeline?: string;

    /**
     * The name of the search hub / origin level 1 to pass when executing search requests and logging usage analytics events with the token.
     *
     * string
     * example: SupportHub
     */
    searchHub: string;

    /**
     * The userDisplayName to pass when logging usage analytics search events.
     *
     * string
     * default: Anonymous
     * example: Alice Smith
     */
    userDisplayName?: string;

    /**
     * The userGroups to pass when logging usage analytics search events. Must be a stringified array in JSON.
     *
     * string
     * default: []
     * example: ["Tech support agents", "Employees"]
     */
    userGroups?: string;

    /**
     * The security identities to impersonate when authenticating a query with this search token. Must be a stringified array in JSON.
     * By default, the service uses a single security identity representing an anonymous user.
     *
     * string
     * default: [{"name":"anonymous@coveo.com","provider":"Email Security Provider"}]
     * example: [{"name":"johndoe@coveo.com","provider":"Email Security Provider"}]
     */
    userIds?: string;

    /**
     * The number of milliseconds the search token will remain valid for once it has been created.
     *
     * integer
     * default: 86400000
     * maximum: 86400000
     * minimum: 900000
     * example: 3600000
     */
    validFor?: number;
}

export enum ButtonPositionHorizontalRequestModel {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export enum ButtonPositionVerticalRequestModel {
    Top = 'top',
    Middle = 'middle',
    Bottom = 'bottom',
}

export enum ButtonPositionHorizontalResponseModel {
    // eslint-disable-next-line id-blacklist
    Undefined = 'Undefined',
    Left = 'Left',
    Center = 'Center',
    Right = 'Right',
}

export enum ButtonPositionVerticalResponseModel {
    // eslint-disable-next-line id-blacklist
    Undefined = 'Undefined',
    Top = 'Top',
    Middle = 'Middle',
    Bottom = 'Bottom',
}

/**
 * The configuration to use for the new InAppWidget.
 */
export type CreateInProductExperienceModel = CreateUpdateInProductExperienceModel;

export type CreateInProductExperienceResponse = Pick<
    InProductExperienceModel,
    'id' | 'name' | 'lastModified' | 'title' | 'button' | 'token'
> & {
    /**
     * The <script> HTML tag to include in the head content.
     *
     * string
     * default: <script async src='https://platformdev.cloud.coveo.com/rest/organizations/{organizationID}/pages/{pageID}/inappwidget/loader'></script>
     */
    scriptToInclude: string;
};

/**
 * The new configuration to use for the updated InAppWidget.
 */
export type UpdateInProductExperienceModel = CreateUpdateInProductExperienceModel;

export type InProductExperienceLoader = string;

export interface IPXButtonModel {
    /**
     * The button's CSS.
     */
    buttonCSS: CSSResourceModel[];

    /**
     * The CSS classes of the button.
     *
     * string[]
     * example: List [ "btn", "mod-primary" ]
     */
    buttonCSSClasses: string[];

    /**
     * The button's colors.
     */
    buttonColor: {
        /**
         * The value of the button CSS background-color property.
         *
         * string
         * example: #2a2aa2
         */
        color: string;

        /**
         * The value of the CSS color property.
         *
         * string
         * example: #e0e0e0
         */
        textColor: string;
    };

    /**
     * The button's font.
     */
    buttonFont: {
        /**
         * The value of the CSS font-family property.
         *
         * string
         * example: 'Courier New', Courier, monospace
         */
        family: string;

        /**
         * The value of the CSS font-size property.
         *
         * string
         * example: 24px
         */
        size: string;
    };

    /**
     * The button's icon.
     */
    buttonIcon: {
        /**
         * The icon's stringified HTML.
         *
         * string
         * default: <svg width="22" height="22" viewBox="0 0 22 22"> <g fill="currentColor"> <path d="m1,11c0,5.52 4.48,10 10,10s10,-4.48 10,-10s-4.48,-10 -10,-10s-10,4.48 -10,10z" fill="transparent"></path> <path d="m11,22c-6.07,0 -11,-4.935 -11,-11s4.935,-11 11,-11s11,4.935 11,11s-4.935,11 -11,11m0,-20c-4.962,0 -9,4.04 -9,9s4.04,9 9,9s9,-4.04 9,-9s-4.04,-9 -9,-9"></path> <path d="m10,17l2,0l0,-2l-2,0l0,2m1,-12.344c-2.21,0 -4,1.79 -4,4l2,0c0,-1.1 0.9,-2 2,-2s2,0.9 2,2c0,2 -3,1.75 -3,5l2,0c0,-2.25 3,-2.5 3,-5c0,-2.21 -1.79,-4 -4,-4"></path> </g> </svg>
         * example: <svg><circle/></svg>
         */
        value: string;
    };

    /**
     * The button's JavaScript.
     */
    buttonJS: JavaScriptResourceModel[];

    /**
     * The button's text alignment.
     */
    buttonPosition: {
        /**
         * The horizontal alignment of the button.
         *
         * string
         * default: Right
         * example: Center
         */
        horizontalPosition: ButtonPositionHorizontalResponseModel;

        /**
         * The vertical alignment of the button.
         *
         * string
         * default: Bottom
         * example: Middle
         */
        verticalPosition: ButtonPositionVerticalResponseModel;
    };
    buttonTargetSelector: string;
}
