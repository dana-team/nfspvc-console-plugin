export interface K8sResourceCommon {
    metadata: {
        name: string;
        namespace?: string;
        creationTimestamp?: string;
        [key: string]: any;
    };
    spec?: {
        capacity?: {
            storage?: string;
        };
        server?: string;
        [key: string]: any;
    };
    [key: string]: any;
}
