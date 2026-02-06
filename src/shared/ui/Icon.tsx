import React from 'react';
import { cn } from '@/shared/lib/utils';
import {
    ArrowRight,
    Rocket,
    Menu,
    X,
    CheckCircle,
    TrendingUp,
    Search,
    ChevronDown,
    ChevronRight,
    Star,
    User,
    Settings,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    Info,
    Home,
    Layout,
    Layers,
    Box,
    Cpu,
    Globe,
    Monitor,
    Smartphone,
    Shield,
    Zap,
    BarChart,
    PieChart,
    Activity,
    Target,
    Award,
    Users,
    MessageSquare,
    FileText,
    Briefcase,
    Code,
    Database,
    Cloud,
    Server,
    Lock,
    Eye,
    EyeOff,
    Trash,
    Edit,
    Plus,
    Minus,
    Download,
    Upload,
    Share,
    Link as LinkIcon,
    ExternalLink,
    HelpCircle,
    AlertCircle,
    Check,
    Circle,
    Palette,
    Droplet,
    Type,
    Image as ImageIcon,
    Video,
    Music,
    Mic,
    Speaker,
    Headphones,
    Camera,
    Printer,
    Wifi,
    Bluetooth,
    Battery,
    Sun,
    Moon,
    Wind,
    CloudRain,
    CreditCard,
    DollarSign,
    ShoppingBag,
    ShoppingCart,
    Gift,
    Truck,
    Package,
    Navigation,
    Compass,
    Map,
    Move,
    Maximize,
    Minimize,
    RefreshCw,
    Power,
    LogOut,
    LogIn,
    MoreHorizontal,
    MoreVertical,
    List,
    Grid,
    Filter,
    SortAsc,
    SortDesc,
    CheckSquare,
    Square,
    Terminal,
    Command,
    Hash,
    AtSign,
    Slack,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Github,
    Youtube,
    Twitch,
    Facebook as Meta,
    Construction,
    Building2 as Apartment, // Renaming for compatibility
    Lightbulb,
    HeartPulse as HealthAndSafety,
    Gavel,
    PartyPopper as Celebration,
    Share2 as HubIcon, // Approximating Hub
    LayoutDashboard as Dashboard,
    Network as Lan,
    BarChart3 as Analytics,
    FolderOpen
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    // Arrow / Navigation
    'arrow_forward': ArrowRight,
    'arrow_right': ArrowRight,
    'chevron_right': ChevronRight,
    'expand_more': ChevronDown,
    'menu': Menu,
    'close': X,

    // General
    'check_circle': CheckCircle,
    'check': Check,
    'rocket_launch': Rocket,
    'trending_up': TrendingUp,
    'search': Search,
    'star': Star,
    'user': User,
    'settings': Settings,
    'mail': Mail,
    'phone': Phone,
    'map_pin': MapPin,
    'calendar_month': Calendar,
    'schedule': Clock,
    'info': Info,
    'home': Home,
    'dashboard': Dashboard,
    'gavel': Gavel,
    'celebration': Celebration,
    'hub': HubIcon,
    'article': FileText,
    'layers': Layers,

    // Tech / Services
    'code': Code,
    'web': Globe,
    'monitor': Monitor,
    'smartphone': Smartphone,
    'security': Shield,
    'speed': Zap,
    'analytics': Analytics,
    'insights': Activity,

    // Industries (Approximate mappings)
    'construction': Construction,
    'apartment': Apartment,
    'shopping_cart': ShoppingCart,
    'shopping_bag': ShoppingBag,
    'lightbulb': Lightbulb,
    'health_and_safety': HealthAndSafety,
    'palette': Palette,
    'design_services': Palette,

    // Misc found in codebase
    'folder_open': FolderOpen,
    'lan': Lan,
    'description': FileText,
    'map': Map,
    'list': List,
    'edit': Edit,
    'add': Plus,
    'delete': Trash,
    'more_vert': MoreVertical
};

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    name: string;
    label?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Icon: React.FC<IconProps> = ({ name, label, className, size, ...props }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-10 h-10',
    };

    const LucideIcon = iconMap[name] || iconMap[name.replace(/_/g, '-')] || null;

    if (LucideIcon) {
        return (
            <span
                className={cn("inline-flex items-center justify-center select-none", size && sizeClasses[size], className)}
                role={label ? "img" : undefined}
                aria-label={label}
                {...props}
            >
                <LucideIcon className="w-full h-full" />
            </span>
        );
    }

    // Fallback if no mapping found (helps verify missing icons)
    return (
        <span
            className={cn("material-symbols-outlined select-none text-red-500", size && sizeClasses[size], className)}
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={!label}
            title={`Missing Icon: ${name}`}
            {...props}
        >
            {name}
        </span>
    );
};
