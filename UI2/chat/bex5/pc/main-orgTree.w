<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="./main-base.w" 
  __id="id_1" 
  design="device:m;" 
  sysParam="false" 
  class="window" >

   <div xid="leftContainer" src="./orgTree.w" process="/SA/OPM/system/systemProcess"
    activity="mainActivity" xui:update-mode="merge"/>
   

</div>