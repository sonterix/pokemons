export const NAV = [
  { id: 1, link: '/', text: 'Home' },
  { id: 2, link: '/pokemons', text: 'Pokemons' },
  { id: 3, link: '/types', text: 'Types' },
  { id: 4, link: '/contact', text: 'Contact us' }
]

export const HOME_NAV = [
  { id: 1, link: '/pokemons', text: 'Pokemons', color: '#e3360e' },
  { id: 2, link: '/types', text: 'Types', color: '#653e97' },
  { id: 3, link: '/contact', text: 'Contact', color: '#ee6b2f' }
]

export const API = {
  link: 'https://pokeapi.co/api/v2/',
  pokemon: 'pokemon/',
  type: 'type/',
  color: 'pokemon-color/',
  habitat: 'pokemon-habitat/',
  generation: 'generation/',
  shape: 'pokemon-shape/'
}

export const getIdFromUrl = url => {
  try {
    const [ pokemonid ] = url.match(/\/[0-9]+\/$/)
    return pokemonid.replace(/\//g, '') || 0
  } catch (error) {
    return 0
  }
}

export const showOverflow = () => {
  document.body.style.overflow = 'visible';
}

export const hideOverflow = () => {
  document.body.style.overflow = 'hidden';
}

export const setLS = (name, value) => {
  localStorage.setItem(name, value);
} 

export const getLS = name => {
  return localStorage.getItem(name);
} 