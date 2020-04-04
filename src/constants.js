export const NAV = [
  { id: 1, link: '/', text: 'Home' },
  { id: 2, link: '/pokemons', text: 'Pokemons' },
  { id: 3, link: '/types', text: 'Types' }
]

export const HOME_NAV = [
  { id: 1, link: '/pokemons', text: 'Pokemons', color: '#e3360e' },
  { id: 2, link: '/types', text: 'Types', color: '#653e97' }
]

export const API = {
  link: 'https://pokeapi.co/api/v2/',
  pokemon: 'pokemon/',
  type: 'type/'
}

export const getIdFromUrl = url => {
  const [ pokemonid ] = url.match(/\/[0-9]+\/$/)
  return pokemonid.replace(/\//g, '') || 0
}
