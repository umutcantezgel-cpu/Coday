"use client";

import React from 'react';
import { cn } from '@/shared/lib/utils';
import {
  ArrowRight,
  RocketLaunch,
  List,
  X,
  CheckCircle,
  TrendUp,
  MagnifyingGlass,
  CaretDown,
  CaretRight,
  Star,
  User,
  Gear,
  Envelope,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Info,
  House,
  Layout,
  Stack,
  Cube,
  Globe,
  Desktop,
  DeviceMobile,
  Shield,
  Lightning,
  Pulse,
  Chat,
  FileText,
  Code,
  Database,
  Cloud,
  Lock,
  Trash,
  Pencil,
  Plus,
  ArrowSquareOut,
  WarningCircle,
  Check,
  Circle,
  Palette,
  WifiHigh,
  Sun,
  Moon,
  CurrencyDollar,
  Tote,
  ShoppingCart,
  Package,
  Compass,
  MapTrifold,
  ArrowsClockwise,
  DotsThreeVertical,
  SlackLogo,
  TwitterLogo,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  Headphones,
  GithubLogo,
  YoutubeLogo,
  TwitchLogo,
  MetaLogo,
  Barricade,
  Buildings,
  Lightbulb,
  Heartbeat,
  Gavel,
  Confetti,
  ShareNetwork,
  SquaresFour,
  ChartBar,
  FolderOpen,
  Kanban,
  ArrowUpRight,
  CloudSlash,
  Warning,
  Storefront,
  Laptop,
  Devices,
  WifiSlash,
  Image,
  ArrowLeft,
  Ruler,
  Sparkle,
  Key,
  Wheelchair,
  Flask,
  Users,
  CompassTool,
  ShieldCheck,
  Cookie,
  Heart,
  CaretLeft,
  XCircle,
  PaintBrush,
  CursorClick,
  Play,
  Robot,
  Headset,
  CreditCard,
  HardDrives,
  Wrench,
  ArrowsLeftRight,
  CloudCheck,
  FilmStrip,
  PlugsConnected,
  DownloadSimple,
  Translate,
  MagnifyingGlassPlus,
  BookOpen,
  Handshake,
  Copyright,
  Target,
  FunnelSimple,
  ShareFat,
  GraduationCap,
  Receipt,
  Link,
  Briefcase,
  Eye,
  NotePencil,
  FirstAid,
  ListNumbers,
  // CursorClick is already imported at line 100
  Medal,
  Scales,
  ForkKnife,
  BookmarkSimple,
  Camera,
  VideoCamera,
  LockOpen,
  Truck,
  DeviceTablet,
  Funnel,
  PaperPlaneTilt,
  QrCode,
  Moped,
  SealCheck,
  At,
  Browser,
  Hammer,
  Images,
  CurrencyEur,
  Hospital,
  FigmaLogo,
  Brain,
  ChartLineUp,
  Cpu,
  ChatCircleDots,
  Files,
  Timer,
  Bug,
  MinusCircle,
  ArrowDown,
  Watch,
  CircleNotch,
  Quotes,
} from '@phosphor-icons/react/dist/ssr';
import { useRtl } from '@/shared/hooks/useRtl';

const FLIPPABLE_ICONS = [
  'arrow_right',
  'arrow_left',
  'chevron_right',
  'chevron_left',
  'caret_right',
  'caret_left',
  'arrow_forward',
  'arrow_back',
  'arrow_up_right',
  'send',
  'logout',
  'login',
  'undo',
  'redo',
];

const iconMap: Record<string, React.ElementType> = {
  // Arrow / Navigation
  clock: Clock,
  arrow_forward: ArrowRight,
  arrow_right: ArrowRight,
  chevron_right: CaretRight,
  expand_more: CaretDown,
  menu: List, // Phosphor uses List for Menu
  close: X,

  // General
  check_circle: CheckCircle,
  check: Check,
  rocket_launch: RocketLaunch,
  trending_up: TrendUp,
  search: MagnifyingGlass,
  star: Star,
  user: User,
  settings: Gear,
  mail: Envelope,
  phone: Phone,
  map_pin: MapPin,
  calendar_month: Calendar,
  schedule: Clock,
  info: Info,
  home: House,
  dashboard: SquaresFour,
  gavel: Gavel,
  celebration: Confetti,
  hub: ShareNetwork,
  article: FileText,

  // Tech / Services
  code: Code,
  web: Globe,
  monitor: Desktop,
  smartphone: DeviceMobile,
  security: Shield,
  speed: Lightning,
  analytics: ChartBar,
  chart_bar: ChartBar,
  insights: Pulse,

  // Industries (Approximate mappings)
  construction: Barricade,
  apartment: Buildings,
  shopping_cart: ShoppingCart,
  shopping_bag: Tote,
  lightbulb: Lightbulb,
  health_and_safety: Heartbeat,
  palette: Palette,
  design_services: Palette,

  // Misc found in codebase
  folder_open: FolderOpen,
  lan: ShareNetwork, // Fallback
  description: FileText,
  map: MapTrifold,
  list: List,
  edit: Pencil,
  add: Plus,
  delete: Trash,
  more_vert: DotsThreeVertical,

  // Material Symbols Mappings
  kanban: Kanban,
  view_kanban: Kanban,
  forum: Chat,
  error: WarningCircle,
  error_outline: WarningCircle,
  cloud_off: CloudSlash,
  warning: Warning,
  paid: CurrencyDollar,
  store: Storefront,
  desktop_mac: Desktop,
  laptop_mac: Laptop,
  screenshot_monitor: Devices,
  headphones: Headphones,
  wifi: WifiHigh,
  wifi_off: WifiSlash,
  image: Image,
  refresh: ArrowsClockwise,
  light_mode: Sun,
  dark_mode: Moon,

  arrow_left: ArrowLeft,
  gear: Gear,
  location_on: MapPin,

  // React Icons / FA fallback mappings (normalized names)

  // NEW MAPPINGS for Mass Replacement
  travel_explore: Compass,
  architecture: CompassTool,
  code_off: Code, // Fallback

  cleaning_services: Sparkle,
  key: Key,
  accessibility: Wheelchair,
  science: Flask,
  rule: Ruler,
  group: Users,
  person: User,
  loyalty: Heart,
  lock: Lock,
  verified_user: ShieldCheck,
  cookie: Cookie,
  calendar_clock: Calendar, // Fallback
  sms: Chat,
  reviews: Star,
  storefront: Storefront,
  cancel: XCircle,
  chevron_left: CaretLeft,
  view_in_ar: Cube,
  open_in_new: ArrowSquareOut,
  inventory_2: Package,
  category: Stack,
  '360': ArrowsClockwise,
  assignment: FileText,

  // Social & Brands
  github: GithubLogo,
  twitter: TwitterLogo,
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  youtube: YoutubeLogo,
  twitch: TwitchLogo,
  slack: SlackLogo,
  meta: MetaLogo,

  // React Icons replacements
  circle: Circle,
  'file-text': FileText,

  layout: Layout,
  'arrow-up-right': ArrowUpRight, // Ensure this exists for CardNav
  bolt: Lightning, // For fa-bolt

  // Missing Icon Fixes
  layers: Stack,
  database: Database,
  brush: PaintBrush,
  cloud: Cloud,
  shield: Shield,
  accessibility_new: Wheelchair,
  touch_app: CursorClick,
  play_arrow: Play,
  play: Play,
  'alert-triangle': Warning,

  // Fixes from Verification Tour
  'chevron-down': CaretDown,
  'arrow-right': ArrowRight,
  verified: ShieldCheck,

  // Missing Icon Fixes (Phase 2)
  smart_toy: Robot,
  support_agent: Headset,
  phone_iphone: DeviceMobile,
  dns: HardDrives,
  payments: CreditCard,
  sync_alt: ArrowsLeftRight,
  build: Wrench,
  cloud_done: CloudCheck,
  business: Buildings,
  domain: Buildings,
  widgets: SquaresFour,
  animation: FilmStrip,
  api: PlugsConnected,
  install_mobile: DownloadSimple,
  language: Translate,
  manage_search: MagnifyingGlassPlus,

  // Legal Pages Icons
  bulb: Lightbulb,
  book: BookOpen,
  handshake: Handshake,
  timeline: Clock,
  copyright: Copyright,
  target: Target,
  filter_list: FunnelSimple,
  share: ShareFat,
  school: GraduationCap,
  receipt: Receipt,
  work: Briefcase,
  favorite: Heart,
  rocket: RocketLaunch,
  location: MapPin,
  globe: Globe,
  folder: FolderOpen,
  visibility: Eye,
  link: Link,
  edit_document: NotePencil,
  healing: FirstAid,
  ads_click: CursorClick,
  format_list_numbered: ListNumbers,
  workspace_premium: Medal,
  balance: Scales,
  restaurant: ForkKnife,
  bookmark_add: BookmarkSimple,
  camera_alt: Camera,
  business_center: Briefcase,
  cases: Briefcase,
  video_camera_front: VideoCamera,
  computer: Desktop,
  attach_money: CurrencyDollar,
  lock_open: LockOpen,
  devices: Devices,
  local_shipping: Truck,
  tablet_mac: DeviceTablet,
  filter_alt: Funnel,
  schedule_send: PaperPlaneTilt,
  qr_code_2: QrCode,
  delivery_dining: Moped,
  domain_verification: SealCheck,
  alternate_email: At,
  support: Headset,
  chat: Chat,
  browser: Browser,
  hammer: Hammer,
  collections: Images,
  currency_exchange: CurrencyEur,
  local_hospital: Hospital,
  medical_services: FirstAid,
  groups: Users,

  // Missing Design Page Icons
  query_stats: ChartLineUp,
  psychology: Brain,
  figma_logo: FigmaLogo,
  figma: FigmaLogo,

  // Missing Icons Fix (Phase 5)
  plugs_connected: PlugsConnected,
  cpu: Cpu,
  users: Users,
  chat_circle_dots: ChatCircleDots,
  credit_card: CreditCard,
  files: Files,
  timer: Timer,
  bug: Bug,
  lightning: Lightning,
  x: X,
  minus_circle: MinusCircle,
  arrow_down: ArrowDown,

  // Missing Headless CMS Page Icons
  device_mobile: DeviceMobile,
  watch: Watch,
  share_network: ShareNetwork,
  shield_check: ShieldCheck,

  // Missing Contact Page Icons
  send: PaperPlaneTilt,
  loader: CircleNotch,
  quotes: Quotes,
  format_quote: Quotes,
};

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
}

export const Icon: React.FC<IconProps> = ({
  name,
  label,
  className,
  size,
  weight = 'regular',
  ...props
}) => {
  const { isRtl } = useRtl();
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  const nameKey = name.toLowerCase().replace(/-/g, '_');
  const PhosphorIcon = iconMap[nameKey] || iconMap[name] || null;

  if (PhosphorIcon) {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center select-none',
          size && sizeClasses[size],
          className
        )}
        style={{
          transform: isRtl && FLIPPABLE_ICONS.includes(nameKey) ? 'scaleX(-1)' : undefined,
          ...props.style,
        }}
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={!label}
        {...props}
      >
        <PhosphorIcon className="w-full h-full" weight={weight} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center select-none text-red-500',
        size && sizeClasses[size],
        className
      )}
      role={label ? 'img' : undefined}
      aria-label={label || `Missing icon: ${name}`}
      title={`Missing Icon: ${name}`}
      {...props}
    >
      <WarningCircle className="w-full h-full" />
    </span>
  );
};
