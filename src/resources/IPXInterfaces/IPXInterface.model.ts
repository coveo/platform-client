import {HostedInterfaceConfiguration, HostedInterfaceResultTemplate} from '../HostedInterfacesCore';

export interface IPXResultTemplate extends HostedInterfaceResultTemplate {}

export interface IPXButton {
    label: string;
}

export interface IPXInterfaceConfiguration extends HostedInterfaceConfiguration {
    /**
     * The list of result templates defined for the ipx.
     */
    resultTemplates: IPXResultTemplate[];

    /**
     * The button element of the ipx interface.
     */
    button: IPXButton;
}
