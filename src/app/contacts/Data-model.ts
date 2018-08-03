export class Contact {
  private contactId: long;
  private contactName: String;
  private contactNumber: String;
  private user: any;
  
  setcontactName(contactName): void {
    this.contactName = contactName;
  }
  setcontactNumber(contactNumber): void {
    this.contactNumber = contactNumber;
    console.log(contactNumber);
  }
  setcontactId(contactId): void {
    this.contactId = contactId;
  }
  setuserObj(obj): void {
    this.user = obj;
  }
}
export class User {
  private userId: long;
  private firstName: String;
  private lastName: String;
  private email: String;
  private password: String;
  private authToken: String;
  setuserId(userId): void {
    this.userId = userId;
  }
  setfirstName(firstName): void {
    this.firstName = firstName;
  }
  setlastName(lastName): void {
    this.lastName = lastName;
  }
  setemail(email): void {
    this.email = email;
  }
  setpassword(password): void {
    this.password = password;
  }
  setAuthToken(authToken): void {
    this.authToken = authToken;
  }
}
