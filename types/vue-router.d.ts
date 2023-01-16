import "vue-router"

declare module "vue-router" {
   interface RouteMeta {
     /**
      * Set the name of this route displayed in the sidebar and breadcrumbs
      */
     title?: string
     /**
      * Set the icon for this route, remember to import svg into @/icons/svg
      */
     svgIcon?: string
     /**
      * Set the icon of this route, directly use the Icon of Element Plus (when it is set at the same time as svgIcon, svgIcon will take effect first)
      */
     elIcon?: string
     /**
      * Default false, when set to true, the route will not appear in the sidebar
      */
     hidden?: boolean
     /**
      * Set the access authority of this route, support multiple authority superposition
      */
     roles?: string[]
     /**
      * Default true, if set to false, will not show in breadcrumbs
      */
     breadcrumb?: boolean
     /**
      * default false, if set to true, it will be fixed in tags-view
      */
     affix?: boolean
     /**
      * When the number of routes declared by children under a route is greater than 1, it will automatically become a nested mode,
      * When there is only one, that sub-route will be displayed in the sidebar as the root route,
      * If you want to display your root route regardless of the number of children declarations under the route,
      * You can set alwaysShow: true, so that the previously defined rules will be ignored and the root route will always be displayed
      */
     alwaysShow?: boolean
     /**
      * Example: activeMenu: "/xxx/xxx",
      * When this attribute is set to enter the route, the sidebar corresponding to the activeMenu attribute will be highlighted.
      * This attribute is suitable for use on routes with hidden: true attribute
      */
     activeMenu?: string
   }
}
