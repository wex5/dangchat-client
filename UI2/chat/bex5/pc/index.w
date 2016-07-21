<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xmlns:xu="http://www.xmldb.org/xupdate" component="$UI/system/components/justep/window/window" xid="window" extends="../../base/index.w"
  __id="id_1" design="device:pc;$skin:compact;" sysParam="false" class="window">  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" routable="false"
    showTitle="true" status="normal" xid="personalDialog" xui:parent="window" xui:update-mode="insert"/>  
  <table class="x-chat-table" style="display: none;" xui:parent="window" xui:update-mode="insert"> 
    <tbody class=""> 
      <tr class="x-chat-tr"> 
        <td class="x-chat-meun"> 
          <ul class="nav nav-pills nav-stacked x-chat-meun-tabs"> 
            <li class="about"> 
              <a bind-click="personalInfo" href="#" title="关于"> 
                <i class="icon-android-contact"/> 
              </a> 
            </li>  
            <li class="active main"> 
              <a bind-click="toChats" href="#" title="聊天"> 
                <i class="icon-chatboxes"/> 
              </a> 
            </li>  
            <li class="contact"> 
              <a bind-click="toContact" href="#" title="通讯录"> 
                <i class="icon-android-contacts"/> 
              </a> 
            </li>  
            <li class="orgTree"> 
              <a bind-click="toOrgTree" href="#" title="树形视图"> 
                <i class="icon-android-friends"/> 
              </a> 
            </li>  
          </ul> 
        </td>  
        <td class="x-chat-main"> 
          <div active="0" class="x-contents" component="$UI/system/components/justep/contents/contents"
            xid="pages"/> 
        </td> 
      </tr> 
    </tbody> 
  </table>  
  <div xid="model" onLoad="modelLoad" xui:update-mode="merge"/> 
</div>
