import { LitElement, html, css } from 'lit';


class BreweryApp extends LitElement {

  static properties = {
    loading : {type : Boolean},
    breweries : {type : Array}
  }

  constructor(){
    super()
    this.breweries = [];
    this.loading = false;
  }

  connectedCallback(){
    super.connectedCallback()

    if(this.breweries.length === 0){
      this.fetchBreweries(); 
    }
  }

  async fetchBreweries(){
    this.loading = true;
    const response = await fetch('https://api.openbrewerydb.org/v1/breweries?by_city=minneapolis')
    const jsonResponse = await response.json();
    this.breweries = jsonResponse
    this.loading = false;
  }

  toggleVistedStatus(breweryToUpdate){
    this.breweries = this.breweries.map(brewery => brewery === breweryToUpdate ? {...brewery, visited : !brewery.visited} : brewery)
  }



  render(){

    const totalVisited = this.breweries.filter(b => b.visited).length;
    const totalUnVisited = this.breweries.filter(b => !b.visited).length;

    if(this.loading){
      return html`<p>Loading...</p>`
    }
    return html`
    <h1>Breweries App</h1>

    <h2>Breweries</h2>

    <p>Visited, ${totalVisited}, ${totalUnVisited} remaining...</p>
    
    <ul>
      ${this.breweries.map((brewery) => html`
        <li>
          ${brewery.name} <button @click="${() => {this.toggleVistedStatus(brewery)}}">${brewery.visited ? 'Mark un-visited' : 'mark visited'}</button>
        </li>`)}

    </ul>
    `
  }
}

customElements.define('brewery-app', BreweryApp);