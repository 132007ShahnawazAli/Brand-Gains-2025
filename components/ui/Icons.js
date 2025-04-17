// Centralized icon system with filled variants
import {
  HomeIcon as HomeOutline,
  MailOpenIcon as MailOutline,
  PhoneIcon as PhoneOutline,
  CheckIcon as CheckOutline,
  LoaderIcon as LoaderOutline,
  SearchIcon as SearchOutline,
  ArrowsUpFromLineIcon as TrendingUpOutline,
  UsersIcon as UsersOutline,
  CircleCheckIcon as CheckCircleOutline,
  ArrowRightIcon as ArrowRightOutline,
  ArrowLeftIcon as ArrowLeftOutline,
  PlusIcon as PlusOutline,
  MinusIcon as MinusOutline,
  XIcon as XOutline,
  HeartIcon as HeartOutline,
  ExternalLinkIcon as ExternalLinkOutline,
  PlayIcon as PlayOutline,
} from "lucide-react"

// Import filled icons from react-icons
import {
  FaHome,
  FaEnvelope,
  FaPhone,
  FaCheck,
  FaSpinner,
  FaSearch,
  FaChartLine,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaPlus,
  FaMinus,
  FaTimes,
  FaHeart,
  FaExternalLinkAlt,
  FaPlay,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedin,
  FaBars,
} from "react-icons/fa"

// Map of icon names to their components (both outlined and filled)
export const Icons = {
  // Navigation and UI
  home: { outline: HomeOutline, filled: FaHome },
  menu: { outline: HomeOutline, filled: FaBars },
  close: { outline: XOutline, filled: FaTimes },
  arrowRight: { outline: ArrowRightOutline, filled: FaArrowRight },
  arrowLeft: { outline: ArrowLeftOutline, filled: FaArrowLeft },
  externalLink: { outline: ExternalLinkOutline, filled: FaExternalLinkAlt },

  // Form and interaction
  mail: { outline: MailOutline, filled: FaEnvelope },
  phone: { outline: PhoneOutline, filled: FaPhone },
  check: { outline: CheckOutline, filled: FaCheck },
  loader: { outline: LoaderOutline, filled: FaSpinner },
  plus: { outline: PlusOutline, filled: FaPlus },
  minus: { outline: MinusOutline, filled: FaMinus },

  // Features and services
  search: { outline: SearchOutline, filled: FaSearch },
  trending: { outline: TrendingUpOutline, filled: FaChartLine },
  users: { outline: UsersOutline, filled: FaUsers },
  checkCircle: { outline: CheckCircleOutline, filled: FaCheckCircle },
  heart: { outline: HeartOutline, filled: FaHeart },
  play: { outline: PlayOutline, filled: FaPlay },

  // Social media
  instagram: { outline: null, filled: FaInstagram },
  twitter: { outline: null, filled: FaTwitter },
  facebook: { outline: null, filled: FaFacebookF },
  linkedin: { outline: null, filled: FaLinkedin },
}

// Icon component that can render either outlined or filled variants
export const Icon = ({ name, variant = "filled", size = 24, className = "", ...props }) => {
  if (!Icons[name]) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  const IconComponent = variant === "filled" ? Icons[name].filled : Icons[name].outline

  if (!IconComponent) {
    console.warn(`${variant} variant for "${name}" icon not available`)
    return null
  }

  return <IconComponent size={size} className={className} {...props} />
}
