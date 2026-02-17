export type DemoMeta = {
  slug: string
  name: string
  description: string
  registryName: string
  isCustom: boolean
  hasDemo: boolean
}

export const components: DemoMeta[] = [
  { slug: "accordion", name: "Accordion", description: "Vertically stacked set of interactive headings that reveal content.", registryName: "accordion", isCustom: false, hasDemo: true },
  { slug: "alert", name: "Alert", description: "Displays a callout for important information.", registryName: "alert", isCustom: true, hasDemo: true },
  { slug: "alert-dialog", name: "Alert Dialog", description: "A modal dialog that interrupts the user with important content and expects a response.", registryName: "alert-dialog", isCustom: false, hasDemo: true },
  { slug: "aspect-ratio", name: "Aspect Ratio", description: "Displays content within a desired ratio.", registryName: "aspect-ratio", isCustom: false, hasDemo: true },
  { slug: "avatar", name: "Avatar", description: "An image element with a fallback for representing the user.", registryName: "avatar", isCustom: true, hasDemo: true },
  { slug: "badge", name: "Badge", description: "Displays a badge or a component that looks like a badge.", registryName: "badge", isCustom: true, hasDemo: true },
  { slug: "breadcrumb", name: "Breadcrumb", description: "Displays the path to the current resource using a hierarchy of links.", registryName: "breadcrumb", isCustom: true, hasDemo: true },
  { slug: "button", name: "Button", description: "Displays a button or a component that looks like a button.", registryName: "button", isCustom: true, hasDemo: true },
  { slug: "calendar", name: "Calendar", description: "A date field component that allows users to enter and edit date.", registryName: "calendar", isCustom: false, hasDemo: true },
  { slug: "card", name: "Card", description: "Displays a card with header, content, and footer.", registryName: "card", isCustom: false, hasDemo: true },
  { slug: "carousel", name: "Carousel", description: "A carousel with motion and swipe built using Embla.", registryName: "carousel", isCustom: false, hasDemo: true },
  { slug: "chart", name: "Chart", description: "Beautiful charts built using Recharts.", registryName: "chart", isCustom: false, hasDemo: true },
  { slug: "checkbox", name: "Checkbox", description: "A control that allows the user to toggle between checked and not checked.", registryName: "checkbox", isCustom: true, hasDemo: true },
  { slug: "collapsible", name: "Collapsible", description: "An interactive component which expands/collapses a panel.", registryName: "collapsible", isCustom: false, hasDemo: true },
  { slug: "command", name: "Command", description: "Fast, composable, unstyled command menu.", registryName: "command", isCustom: false, hasDemo: true },
  { slug: "context-menu", name: "Context Menu", description: "Displays a menu to the user triggered by right-click.", registryName: "context-menu", isCustom: false, hasDemo: true },
  { slug: "dialog", name: "Dialog", description: "A window overlaid on the primary window, rendering content on top.", registryName: "dialog", isCustom: true, hasDemo: true },
  { slug: "drawer", name: "Drawer", description: "A drawer component for React using Vaul.", registryName: "drawer", isCustom: false, hasDemo: true },
  { slug: "dropdown-menu", name: "Dropdown Menu", description: "Displays a menu to the user triggered by a button.", registryName: "dropdown-menu", isCustom: false, hasDemo: true },
  { slug: "form", name: "Form", description: "Building forms with React Hook Form and Zod.", registryName: "form", isCustom: false, hasDemo: true },
  { slug: "hover-card", name: "Hover Card", description: "For sighted users to preview content behind a link.", registryName: "hover-card", isCustom: false, hasDemo: true },
  { slug: "input", name: "Input", description: "Displays a form input field.", registryName: "input", isCustom: true, hasDemo: true },
  { slug: "input-group", name: "Input Group", description: "Groups an input with addons like icons or text.", registryName: "input-group", isCustom: true, hasDemo: true },
  { slug: "input-otp", name: "Input OTP", description: "Accessible one-time password component with copy paste functionality.", registryName: "input-otp", isCustom: false, hasDemo: true },
  { slug: "label", name: "Label", description: "Renders an accessible label associated with controls.", registryName: "label", isCustom: true, hasDemo: true },
  { slug: "menubar", name: "Menubar", description: "A visually persistent menu common in desktop applications.", registryName: "menubar", isCustom: false, hasDemo: true },
  { slug: "navigation-menu", name: "Navigation Menu", description: "A collection of links for navigating websites.", registryName: "navigation-menu", isCustom: false, hasDemo: true },
  { slug: "pagination", name: "Pagination", description: "Pagination with page navigation, next and previous links.", registryName: "pagination", isCustom: false, hasDemo: true },
  { slug: "popover", name: "Popover", description: "Displays rich content in a portal, triggered by a button.", registryName: "popover", isCustom: false, hasDemo: true },
  { slug: "progress", name: "Progress", description: "Displays an indicator showing the completion progress of a task.", registryName: "progress", isCustom: true, hasDemo: true },
  { slug: "radio-group", name: "Radio Group", description: "A set of checkable buttons where only one can be checked at a time.", registryName: "radio-group", isCustom: true, hasDemo: true },
  { slug: "resizable", name: "Resizable", description: "Accessible resizable panel groups and layouts.", registryName: "resizable", isCustom: false, hasDemo: true },
  { slug: "scroll-area", name: "Scroll Area", description: "Augments native scroll functionality for custom, cross-browser styling.", registryName: "scroll-area", isCustom: false, hasDemo: true },
  { slug: "select", name: "Select", description: "Displays a list of options for the user to pick from.", registryName: "select", isCustom: true, hasDemo: true },
  { slug: "separator", name: "Separator", description: "Visually or semantically separates content.", registryName: "separator", isCustom: false, hasDemo: true },
  { slug: "sheet", name: "Sheet", description: "Extends the Dialog component to display content that complements the main content.", registryName: "sheet", isCustom: false, hasDemo: true },
  { slug: "sidebar", name: "Sidebar", description: "A composable, themeable and customizable sidebar component.", registryName: "sidebar", isCustom: false, hasDemo: false },
  { slug: "skeleton", name: "Skeleton", description: "Used to show a placeholder while content is loading.", registryName: "skeleton", isCustom: false, hasDemo: true },
  { slug: "slider", name: "Slider", description: "An input where the user selects a value from within a given range.", registryName: "slider", isCustom: false, hasDemo: true },
  { slug: "sonner", name: "Sonner", description: "An opinionated toast component for React.", registryName: "sonner", isCustom: false, hasDemo: true },
  { slug: "spinner", name: "Spinner", description: "A loading spinner with configurable size and color.", registryName: "spinner", isCustom: true, hasDemo: true },
  { slug: "status-badge", name: "Status Badge", description: "Displays a severity-colored status indicator.", registryName: "status-badge", isCustom: true, hasDemo: true },
  { slug: "switch", name: "Switch", description: "A control that allows the user to toggle between two states.", registryName: "switch", isCustom: true, hasDemo: true },
  { slug: "table", name: "Table", description: "A responsive table component.", registryName: "table", isCustom: false, hasDemo: true },
  { slug: "tabs", name: "Tabs", description: "A set of layered sections of content, known as tab panels.", registryName: "tabs", isCustom: true, hasDemo: true },
  { slug: "textarea", name: "Textarea", description: "Displays a form textarea.", registryName: "textarea", isCustom: true, hasDemo: true },
  { slug: "toggle", name: "Toggle", description: "A two-state button that can be either on or off.", registryName: "toggle", isCustom: false, hasDemo: true },
  { slug: "toggle-group", name: "Toggle Group", description: "A set of two-state buttons that can be toggled on or off.", registryName: "toggle-group", isCustom: false, hasDemo: true },
  { slug: "tooltip", name: "Tooltip", description: "A popup that displays information related to an element.", registryName: "tooltip", isCustom: false, hasDemo: true },
]

export const blocks: DemoMeta[] = [
  { slug: "header", name: "Header", description: "App header with logo, search bar, user info, notifications, and avatar dropdown menu.", registryName: "header", isCustom: true, hasDemo: true },
  { slug: "side-nav", name: "Side Nav", description: "Collapsible side navigation with icon-only collapsed state and tooltip labels.", registryName: "side-nav", isCustom: true, hasDemo: true },
]
