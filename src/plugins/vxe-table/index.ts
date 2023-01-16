import { type App } from "vue"
// https://vxetable.cn/#/table/start/install
import VXETable from "vxe-table"
// https://github.com/x-extends/vxe-table-plugin-element
import VXETablePluginElement from "vxe-table-plugin-element"

VXETable.use(VXETablePluginElement)

/** Global default parameters */
VXETable.setup({
  /** Global size */
  size: "medium",
  /** Global zIndex initial value, if the item's z-index style value is too large, it needs to be set larger to avoid being blocked */
  zIndex: 9999,
  /** Version number, useful for some functions with data cache, up version number can be used for Reset data */
  version: 0,
  /** Global loading prompt content, if null, no text will be displayed */
  loadingText: null,
  table: {
    showHeader: true,
    showOverflow: "tooltip",
    showHeaderOverflow: "tooltip",
    autoResize: true,
    // stripe: false,
    border: "inner",
    // round: false,
    emptyText: "No data yet",
    rowConfig: {
      isHover: true,
      isCurrent: true
    },
    columnConfig: {
      resizable: false
    },
    align: "center",
    headerAlign: "center",
    /** Unique primary key field name of row data */
    rowId: "_VXE_ID"
  },
  pager: {
    // size: "medium",
    /** Matching styles */
    perfect: false,
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [10, 20, 50],
    layouts: ["Total", "PrevJump", "PrevPage", "Number", "NextPage", "NextJump", "Sizes", "FullJump"]
  },
  modal: {
    minWidth: 500,
    minHeight: 400,
    lockView: true,
    mask: true,
    // duration: 3000,
    // marginSize: 20,
    dblclickZoom: false,
    showTitleOverflow: true,
    transfer: true,
    draggable: false
  }
})

export function loadVxeTable(app: App) {
  /** Complete introduction of Vxe Table components */
  app.use(VXETable)
}
