/** 布局配置 */
interface ILayoutSettings {
  /** Whether to display the Settings Panel */
  showSettings: boolean
  /** Whether to display the tab bar */
  showTagsView: boolean
  /** Whether to display the sidebar Logo */
  showSidebarLogo: boolean
  /** Whether to fix Header */
  fixedHeader: boolean
  /** Whether to display message notifications */
  showNotify: boolean
  /** Whether to display the switch theme button */
  showThemeSwitch: boolean
  /** Whether to display the full screen button */
  showScreenfull: boolean
  /** Whether to display gray mode */
  showGreyMode: boolean
  /** Whether to display color weakness mode */
  showColorWeakness: boolean
}

const layoutSettings: ILayoutSettings = {
  showSettings: true,
  showTagsView: true,
  fixedHeader: true,
  showSidebarLogo: true,
  showNotify: true,
  showThemeSwitch: true,
  showScreenfull: true,
  showGreyMode: false,
  showColorWeakness: false
}

export default layoutSettings
