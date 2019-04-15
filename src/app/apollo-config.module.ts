import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpClientModule } from '@angular/common/http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class ApolloConfigModule {

  private apiUrl = 'https://api.graph.cool/simple/v1/cjug5abzs584801962e4yzmm1';

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    const link = this.httpLink.create({uri: this.apiUrl});

    const linkErr = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) { console.log(`[Network error]: ${networkError}`); }
    });

    this.apollo.create({
      link: ApolloLink.from([linkErr, link]),
      cache: new InMemoryCache()
    });
  }

}
