const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, 'data/store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

// Enhance modules with Ribbon GUI Navigation Path and Shortcut Keys
store.modules.forEach(mod => {
  if (mod.id === 'mod-1') {
    mod.ribbonMethod = {
      tab: "Home & View Tabs",
      clickPath: "Home Tab > Number Group > Custom Formatting Dialog (Ctrl + 1)",
      steps: [
        "1. Select cell range with data.",
        "2. Go to 'Home' Tab on Top Ribbon > Click small arrow at corner of 'Number' section.",
        "3. Select 'Custom' and paste format code.",
        "4. Go to 'View' Tab > Uncheck 'Gridlines' to give a clean dashboard look."
      ],
      shortcuts: [
        { "key": "F4", "desc": "Toggle Cell Lock ($A$1 ➔ A$1 ➔ $A1 ➔ A1)" },
        { "key": "Ctrl + 1", "desc": "Open Format Cells Dialog box" },
        { "key": "Alt + H + O + I", "desc": "Auto-fit all column widths instantly" },
        { "key": "Ctrl + Space", "desc": "Select entire active column" },
        { "key": "Shift + Space", "desc": "Select entire active row" }
      ]
    };
    mod.simulatorData.steps = [
      {
        step: 1,
        phase: "DATA INSPECTION (Input Data)",
        action: "Look at Raw Table",
        highlight: ["B2:B5", "D1"],
        narrative_en: "📌 CURRENT DATA: Base Price is in Column B (Cell B2 = $1200). The fixed global Tax Rate (18%) is placed at Cell D1.",
        narrative_hi: "📌 DATA CONTEXT: Humne Column B me Base Price ($1200) liya hai aur Cell D1 me hamara fixed 18% Tax Rate hai.",
        validation_en: "Goal: Compute Tax Amount in Column D without the formula drifting when dragged down.",
        validation_hi: "Goal: Column D me Tax nikalna hai taaki niche drag karne par D1 ka reference na hile."
      },
      {
        step: 2,
        phase: "FORMULA SELECTION & LOCKING",
        action: "Enter =B2*$D$1 in Cell D2",
        highlight: ["B2", "D1"],
        formulaText: "=B2*$D$1",
        narrative_en: "⚙️ FORMULA EXECUTION: Pressing F4 locks cell D1 with dollar signs ($D$1), making it Absolute.",
        narrative_hi: "⚙️ FORMULA EXECUTION: F4 dabane se D1 cell lock ho gaya ($D$1). B2 relative raha.",
        validation_en: "Calculation check: 1200 * 0.18 = $216.00.",
        validation_hi: "Validation check: 1200 * 0.18 = 216 Tax calculation bilkul sahi hai."
      },
      {
        step: 3,
        phase: "FLASH FILL & VALIDATION",
        action: "Drag down across D2:D5",
        range: "D2:D5",
        formulaText: "=B3*$D$1 (Evaluates $153)",
        narrative_en: "✅ RESULT & DRAG VALIDATION: Cell D3 becomes =B3*$D$1 (850*0.18 = 153). D1 stayed fixed at 18%!",
        narrative_hi: "✅ RESULT VALIDATION: Drag karne par D3 = B3*$D$1 ho gaya. Tax rate fixed raha aur saari rows sahi calculate ho gayi!"
      }
    ];
  } else if (mod.id === 'mod-2') {
    mod.ribbonMethod = {
      tab: "Data Tab",
      clickPath: "Data Tab > Data Tools Group > Text to Columns / Flash Fill (Ctrl + E)",
      steps: [
        "1. Click 'Data' Tab on Top Ribbon.",
        "2. In 'Data Tools' group, click 'Flash Fill' (or press Ctrl + E) to auto-extract patterns.",
        "3. To split delimited strings, click 'Text to Columns' > Choose Delimited > Select Pipe '|' or Comma.",
        "4. In 'Data Tools' click 'Data Validation' to add dropdown selection lists."
      ],
      shortcuts: [
        { "key": "Ctrl + E", "desc": "Flash Fill - Auto-detects pattern and splits text" },
        { "key": "Alt + A + E", "desc": "Open Text-to-Columns Wizard" },
        { "key": "Alt + A + V + V", "desc": "Open Data Validation Dialog box" },
        { "key": "Ctrl + H", "desc": "Find & Replace characters/spaces" }
      ]
    };
  } else if (mod.id === 'mod-3') {
    mod.ribbonMethod = {
      tab: "Formulas Tab & Home Tab",
      clickPath: "Formulas Tab > Function Library > Math & Trig / Logical > Insert SUMIFS",
      steps: [
        "1. Click 'Formulas' Tab on Top Ribbon.",
        "2. Click 'Logical' to insert IF / IFS dialog with visual argument boxes.",
        "3. Click 'Math & Trig' > 'SUMIFS' to open the Function Arguments helper wizard.",
        "4. On 'Home' Tab > Click 'Conditional Formatting' > 'Highlight Cells Rules' to color-code high revenues."
      ],
      shortcuts: [
        { "key": "Alt + =", "desc": "AutoSum - Instantly sums adjacent column or row" },
        { "key": "Shift + F3", "desc": "Open Function Wizard Dialog with parameter boxes" },
        { "key": "Alt + H + L", "desc": "Open Conditional Formatting Menu" }
      ]
    };
  } else if (mod.id === 'mod-4') {
    mod.ribbonMethod = {
      tab: "Formulas Tab",
      clickPath: "Formulas Tab > Function Library > Lookup & Reference > XLOOKUP",
      steps: [
        "1. Click 'Formulas' Tab on Top Ribbon.",
        "2. In 'Function Library', click 'Lookup & Reference'.",
        "3. Select 'XLOOKUP' to open visual argument boxes for Lookup_Value, Lookup_Array, and Return_Array.",
        "4. Fill in the boxes with mouse drag-selection without typing commas manually."
      ],
      shortcuts: [
        { "key": "Shift + F3", "desc": "Open Lookup Function Wizard" },
        { "key": "Ctrl + Shift + Down", "desc": "Select entire lookup column down to last row" },
        { "key": "F2", "desc": "Enter Edit Mode inside active lookup cell" }
      ]
    };
  } else if (mod.id === 'mod-5') {
    mod.ribbonMethod = {
      tab: "Insert Tab & PivotTable Analyze Tab",
      clickPath: "Insert Tab > Tables Group > PivotTable (or Ctrl + T first)",
      steps: [
        "1. Select any cell inside your dataset > Press Ctrl + T to create an Official Table.",
        "2. Go to 'Insert' Tab on Top Ribbon > Click 'PivotTable' > Choose New Worksheet.",
        "3. In the Right Sidebar Field List, drag 'Region' to Rows, 'Category' to Columns, and 'Revenue' to Values.",
        "4. Click 'PivotTable Analyze' Tab > Click 'Insert Slicer' to add visual clickable buttons."
      ],
      shortcuts: [
        { "key": "Ctrl + T", "desc": "Convert raw range into an Official Excel Table" },
        { "key": "Alt + N + V", "desc": "Insert Pivot Table shortcut" },
        { "key": "Alt + F5", "desc": "Refresh active Pivot Table data cache" },
        { "key": "Ctrl + Alt + F5", "desc": "Refresh All Pivot Tables in workbook" }
      ]
    };
  } else if (mod.id === 'mod-6') {
    mod.ribbonMethod = {
      tab: "Formulas Tab & Data Tab",
      clickPath: "Data Tab > Sort & Filter Group > Advanced Filter / Formulas Tab > Name Manager (LAMBDA)",
      steps: [
        "1. Go to 'Data' Tab > Use 'Sort & Filter' group for instant visual filtering.",
        "2. For Dynamic Arrays, simply type =FILTER(data, condition) in one cell; no Ribbon wizard is required because it auto-spills.",
        "3. To define custom LAMBDA functions, go to 'Formulas' Tab > Click 'Name Manager' > Add New Name."
      ],
      shortcuts: [
        { "key": "Ctrl + Shift + L", "desc": "Toggle AutoFilter Dropdowns on headers" },
        { "key": "Ctrl + F3", "desc": "Open Name Manager to create LAMBDA formulas" },
        { "key": "Alt + Down Arrow", "desc": "Open Filter Dropdown menu in active header" }
      ]
    };
  } else if (mod.id === 'mod-7') {
    mod.ribbonMethod = {
      tab: "Data Tab",
      clickPath: "Data Tab > Forecast Group > What-If Analysis > Goal Seek / Data Table",
      steps: [
        "1. Click 'Data' Tab on Top Ribbon.",
        "2. Look for the 'Forecast' section on the right side.",
        "3. Click 'What-If Analysis' > Click 'Goal Seek'.",
        "4. Set Cell: Select Profit cell. To Value: Type 50000. By Changing Cell: Select Units cell > Click OK!",
        "5. For 2D Tables, click 'What-If Analysis' > 'Data Table'."
      ],
      shortcuts: [
        { "key": "Alt + A + W + G", "desc": "Open Goal Seek dialog box directly" },
        { "key": "Alt + A + W + T", "desc": "Open 2-Variable Data Table dialog" },
        { "key": "F9", "desc": "Force full workbook recalculation" }
      ]
    };
  } else if (mod.id === 'mod-8') {
    mod.ribbonMethod = {
      tab: "Data Tab (Power Query / Get & Transform)",
      clickPath: "Data Tab > Get Data > From File > From Folder / From Workbook",
      steps: [
        "1. Click 'Data' Tab on Top Ribbon.",
        "2. Click 'Get Data' (top left corner) > 'From File' > 'From Folder'.",
        "3. Select folder containing monthly CSV files > Click 'Combine & Transform Data'.",
        "4. In Power Query Editor, right-click any column > Click 'Unpivot Other Columns'.",
        "5. Click 'Close & Load' (top left) to load clean data into Excel."
      ],
      shortcuts: [
        { "key": "Alt + A + P + N", "desc": "Open Power Query Editor" },
        { "key": "Ctrl + Alt + F5", "desc": "Refresh all Power Query connections" }
      ]
    };
  } else if (mod.id === 'mod-9') {
    mod.ribbonMethod = {
      tab: "Developer Tab",
      clickPath: "Developer Tab > Code Group > Record Macro / Visual Basic (Alt + F11)",
      steps: [
        "1. Enable Developer Tab: File > Options > Customize Ribbon > Check 'Developer'.",
        "2. Click 'Developer' Tab > Click 'Record Macro' > Perform your repetitive actions > Click 'Stop Recording'.",
        "3. Click 'Developer' Tab > 'Insert' > 'Button (Form Control)' to place a clickable button on the sheet.",
        "4. Click 'Visual Basic' (or press Alt + F11) to view and edit clean VBA code."
      ],
      shortcuts: [
        { "key": "Alt + F11", "desc": "Open VBA Visual Basic Editor" },
        { "key": "Alt + F8", "desc": "Open Macro Run / Manage dialog" },
        { "key": "F5", "desc": "Run Macro Sub in VBA Editor" },
        { "key": "F8", "desc": "Step Into VBA code line-by-line" }
      ]
    };
  } else if (mod.id === 'mod-10') {
    mod.ribbonMethod = {
      tab: "Insert, Page Layout & View Tabs",
      clickPath: "Insert Tab > Sparklines / Charts Group > KPI Dashboard Layout",
      steps: [
        "1. Go to 'View' Tab > Uncheck 'Gridlines' and 'Headings' for a clean modern app look.",
        "2. Go to 'Insert' Tab > Sparklines group > Click 'Line' or 'Column' to embed mini-charts in single cells.",
        "3. Go to 'Insert' Tab > Illustrations > Shapes > Insert rounded cards for KPI metrics.",
        "4. Click on Chart Title > in Formula Bar type =A1 to link title dynamically."
      ],
      shortcuts: [
        { "key": "Alt + N + S + L", "desc": "Insert Line Sparkline" },
        { "key": "F11", "desc": "Create instant Chart sheet from selected data" },
        { "key": "Alt + F1", "desc": "Insert default chart on active sheet" }
      ]
    };
  }
});

// Master Shortcuts List
store.masterShortcuts = [
  { "category": "Essential Navigation & Selection", "key": "Ctrl + Shift + L", "action": "Toggle AutoFilter Dropdowns on table headers", "why": "Instantly filter or sort 50k rows in 1 second without touching mouse." },
  { "category": "Essential Navigation & Selection", "key": "F4", "action": "Toggle Absolute Cell Lock ($A$1 ➔ A$1 ➔ $A1 ➔ A1)", "why": "Essential when multiplying transactional columns by fixed tax or exchange rate cells." },
  { "category": "Essential Navigation & Selection", "key": "Alt + H + O + I", "action": "Auto-fit all column widths perfectly", "why": "Eliminates ### column overflow errors instantly." },
  { "category": "Essential Navigation & Selection", "key": "Ctrl + T", "action": "Convert raw range into Official Table", "why": "Enables auto-expanding Pivot Tables and structured formula references." },
  { "category": "Essential Navigation & Selection", "key": "Ctrl + 1", "action": "Open Format Cells Dialog box", "why": "Quickly configure Custom Formats, Dates, and Currencies." },
  { "category": "Formulas & Calculations", "key": "Alt + =", "action": "AutoSum adjacent rows or columns", "why": "Inserts =SUM() automatically above or beside active numbers." },
  { "category": "Formulas & Calculations", "key": "Shift + F3", "action": "Open Insert Function Wizard", "why": "Provides visual parameter helper boxes for any Excel formula." },
  { "category": "Formulas & Calculations", "key": "Ctrl + ~ (Tilde)", "action": "Show all Formulas across entire worksheet", "why": "Audit sheets and verify formula logic without clicking individual cells." },
  { "category": "Data Cleaning & Wrangling", "key": "Ctrl + E", "action": "Trigger Flash Fill", "why": "Automatically splits Full Names, IDs, and Phone numbers by recognizing patterns." },
  { "category": "Data Cleaning & Wrangling", "key": "Alt + A + V + V", "action": "Open Data Validation Dialog", "why": "Create dropdown restriction lists to prevent user typos." },
  { "category": "Data Cleaning & Wrangling", "key": "Ctrl + H", "action": "Find and Replace", "why": "Mass replace bad strings, delimiters, or unwanted symbols across millions of cells." },
  { "category": "Pivot Tables & Analysis", "key": "Alt + N + V", "action": "Insert Pivot Table", "why": "Create cross-tab summary reports in 2 seconds." },
  { "category": "Pivot Tables & Analysis", "key": "Ctrl + Alt + F5", "action": "Refresh All Data Connections & Pivot Tables", "why": "Syncs all reports when new backend data is appended." },
  { "category": "VBA & Developer Tools", "key": "Alt + F11", "action": "Open Visual Basic Editor (VBA)", "why": "Write and debug automated macros and custom UDF functions." },
  { "category": "VBA & Developer Tools", "key": "Alt + F8", "action": "Open Macro Execution Window", "why": "Select and run automated scripts." }
];

fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf8');
console.log('Successfully updated store.json with Ribbon GUI navigation, shortcuts, and intuitive narrative steps!');
