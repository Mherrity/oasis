export interface ExternalMetaData {
    name : string,
    animationurl? : string,
    image? : string
}

export interface Attribute {
    trait_type : string,
    value : string | number
}
export interface MetaData {
    name: string,
    symbol: string,
    description: string,
    seller_fee_basis_points :number,
    collection: {
        name: string,
        family : string
    }
    image: string;
    animation_url : string,
    external_url : string,
    attributes : Attribute[]
}