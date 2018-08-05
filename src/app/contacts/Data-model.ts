export class Contact {
  private contactId: number;
  private contactName: String;
  private contactNumber: String;
  private user: any;
  public get $contactId() {
    return this.contactId;
  }
  public set $contactId(contactId: number) {
    this.contactId = contactId;
  }

  public set $contactName(contactName: string){
    this.contactName = contactName;
  }
  public set $contactNumber(contactNumber: string){
    this.contactNumber = contactNumber;
    console.log(contactNumber);
  }
  public set $userObj(obj :any){
    this.user = obj;
  }
  public get $userObj() {
    return this.user;
  }
  
}

