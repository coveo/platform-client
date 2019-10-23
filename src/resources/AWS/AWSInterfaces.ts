export interface AWSAgentInstanceModel {
    agentId: string;
    amiId: string;
    availabilityZone: string;
    id: string;
    instanceState: 'pending' | 'running' | 'shutting-down' | 'terminated' | 'stopping' | 'stopped';
    instanceType: string;
    launchTime: string;
    license: string;
    organizationId: string;
    platform: 'windows' | 'otherLinux';
    privateDNS: string;
    privateIPAddress: string;
    publicDNS: string;
    publicIP: string;
    region: string;
    role: string;
}
