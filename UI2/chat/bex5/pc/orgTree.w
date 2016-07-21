<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:67px;left:36px;height:auto;"/>  
  
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1" style="overflow-x: hidden;"><div component="$UI/system/components/justep/org/orgTreePC" xid="orgTreePC1"> 
    <div component="$UI/system/components/justep/data/bizData" autoLoad="true" xid="bizData2" />  
    <div component="$UI/system/components/justep/grid/grid" appearance="tree" expandColumn="sName" useVirtualRoot="true" virtualRootLabel="组织机构" xid="grid1" class="x-ownGrid" width="100%" onRowClick="gridRowClick" rowAttr="{style :'width:100%,height:auto'}" height="auto"> 
      <columns xid="columns1"> 
        <column name="sName" xid="column1" />
      </columns> 
    </div> 
  </div>
  </div>
   </div></div>
