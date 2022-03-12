export * as Metaplex from './metaplex'

export enum SupportedChains {
    SOLANA = 'SOLANA',
    ETHEREUM = 'ETHEREUM'
}

export enum SiteStates {
  //Main default state looking for addressses 
  SEARCH = 'SEARCH',
  //Drawing after addresses have been entered
  DRAWING = 'DRAWING',
  //Looking at specific NFT
  NFTVIEW = 'NFTVIEW'
}