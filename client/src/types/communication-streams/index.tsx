export interface CommunicationStream {
    id: string
    name: string
    parentId: string
    parentName: string
    description: string
    responsiblePerson: string
    active: boolean | string
  }
  
  export type CommunicationStreams = {total: number,data:CommunicationStream[]}

  export type CommunicationStreamDetail = {data:CommunicationStream}
