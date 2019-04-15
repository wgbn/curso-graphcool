import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    //this.createUser();
    this.allUsers();
  }

  allUsers(): void {

    this.apollo.query({
      query: gql`
        query {
          allUsers {
            id
            name
            email
          }
        }
      `
    }).subscribe(
      data => console.log(data)
    );

  }

  createUser(): void {

    this.apollo.mutate({
      mutation: gql`
        mutation CreateNewUser($name: String!, $email: String!, $pass: String!){
          createUser(
            name: $name,
            email: $email,
            password: $pass
          ){
            id
            name
            email
          }
        }
      `,
      variables: {
        name: "Homem de Ferro",
        email: "hferro@wgbn.com.br",
        pass: "123456"
      }
    }).subscribe(
      data => console.log(data)
    );

  }
}
