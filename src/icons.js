import {
  Home, Building2, House, MapPin, Phone, MessageCircle,
  User, UserCircle, Users, Monitor, ArrowRight, ArrowLeft,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  Search, AlertCircle, Car, Star, FileText, KeyRound, Banknote,
  Share2, Link, Play, ShoppingBag, Heart
} from 'lucide'

const iconMap = {
  Home, Building2, House, MapPin, Phone, MessageCircle,
  User, UserCircle, Users, Monitor, ArrowRight, ArrowLeft,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  Search, AlertCircle, Car, Star, FileText, KeyRound, Banknote,
  Share2, Link, Play, ShoppingBag, Heart
}

export function icon(name, size = 20, strokeWidth = 1.5, extraClass = '', color = 'currentColor') {
  const iconData = iconMap[name]
  if (!iconData) return ''
  const paths = iconData.map(([tag, attrs]) => {
    const attrStr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')
    return `<${tag} ${attrStr}/>`
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide ${extraClass}" aria-hidden="true">${paths}</svg>`
}
