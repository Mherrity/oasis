export interface ExternalMetaData {
    name : string,
    animationurl? : string,
    image? : string
}

export interface Attribute {
    trait_type : string,
    value : string | number
}

interface MetaPlexCreatorInfo {
    address:string,
    share: number,
    verified: 0 | 1
}
export interface MetaData {
    //shared NFT Metadata standard
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
    attributes? : Attribute[],
    human_owner_name : string,
    owner_of : string,
    //SOL STUFF
    creators: MetaData[]
    sellerFeeBasisPoints: number
    updateAuthority: string,
    mint: string,
    isMutable: number,
    //ERC STUFF
    contract_type : string, 
    token_address : string,
    token_id: string
}