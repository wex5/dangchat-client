<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:pc" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:24px;top:134px;"
    onModelConstruct="modelModelConstruct"> 
    <div autoLoad="true" component="$UI/system/components/justep/data/data"
      idColumn="fID" xid="dialogData" confirmRefresh="false"> 
      <column label="fID" name="fID" type="String" xid="xid1"/>  
      <column label="fNickName" name="fNickName" type="String" xid="xid2"/>  
      <column name="fCounter" type="Integer" xid="xid3"/>  
      <column name="fImg" type="String" xid="xid4"/>  
      <column name="fState" type="String" xid="xid7"/>  
      <column label="" name="fLatestChatDate" parent="dialogData" type="String"
        update-mode="insert" xid="xid1111111"/>  
      <column label="" name="fLatestChat" parent="dialogData" type="String" update-mode="insert"
        xid="xid2111111"/>  
      <column name="fState" type="String" xid="xid11"/>  
      <column name="fType" type="String" xid="xid5"/>  
      <column label="fNickNamePY" name="fNickNamePY" type="String" xid="xid6"/> 
    </div> 
  </div>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="newGroupWindowDialog"
    showTitle="true" status="normal"/>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="popMenu" autoHidable="true" dismissible="true" opacity="0" direction="auto"> 
    <div class="x-popMenu-overlay" xid="div4"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu1"> 
      <li class="x-menu-item" xid="item2"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="查看详细信息" xid="InfoBtn" onClick="InfoBtnClick"> 
          <i xid="i3"/>  
          <span xid="span3">查看详细信息</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item4" bind-if="$model.isGroup.get()"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="删除会话" xid="deleteGroupChatBtn" onClick="deleteGroupChatBtnClick"> 
          <i xid="i1"/>  
          <span xid="span1">删除会话</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item1"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="删除对话" xid="deleteChatBtn" onClick="deleteChatBtnClick"> 
          <i xid="i2"/>  
          <span xid="span2">删除对话</span> 
        </a> 
      </li>  
      <li class="x-menu-divider divider" xid="divider1"/>  
      <li class="x-menu-item" xid="item3"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="创建群组" xid="mCtreateGroup" onClick="newGroupBtnClick"> 
          <i xid="i4"/>  
          <span xid="span4">创建群组</span> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top"> 
      <div class="x-query-input x-flex"> 
        <i class="icon-android-search x-icon-lg"/>  
        <input type="text" class="x-flex1" data-bind="value:filterVal,valueUpdate: 'input'"/>  
        <i class="icon-close-circled  x-icon-lg x-cls-filter hide" bind-css="{hide:!filterVal.get()}"
          bind-click="clsfilterVal"/> 
      </div>  
      <!-- 
      <div class="x-search-bar"> 
        <div class="input-group"> 
          <input type="text" class="form-control" bind-value="filterVal"/>  
          <div class="input-group-btn"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-default"
              label="" icon="icon-android-search" title="查询"> 
              <i class="icon-android-search"/>  
              <span/> 
            </a>  
          </div>  
        </div> 
      </div> 
       --> 
    </div>  
    <div class="x-panel-content  x-scroll-view" xid="content1" style="overflow-x: hidden; bottom: 0px;"
      _xid="C71BB4D25EC000015A973101183B1FDA"> 
      <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
        xid="scrollView1" onPullUp="scrollViewPullUp" autoAppend="false"> 
        <div class="x-scroll-content" xid="div6"> 
          <div class="x-list x-cards" component="$UI/system/components/justep/list/list"
            data="dialogData" xid="list1" filter="$model.dialogFilter($row)"> 
            <ul class="x-list-template list-group" xid="listTemplateUl1"> 
              <li bind-click="msgLIClick" class="list-group-item" xid="li1"
                bind-css="{'x-currentRow':val('fID')===$model.currentDialogID.get()}"
                oncontextmenu="return false;" bind-mouseup="msgRightClick"> 
                <div class="media-left" xid="div2"> 
                  <span bind-html="ref('fCounter')" bind-visible=" $object.val(&quot;fCounter&quot;)&gt;0"
                    class="counter" xid="span11"/>  
                  <img alt="" bind-attr-src=" $model.getImageUrl(val(&quot;fImg&quot;))"
                    class="o-icon" xid="image6" onerror="this.src='../../base/img/person.png'"/> 
                </div>  
                <div class="media-body" xid="div1"> 
                  <h5 bind-text="ref('fNickName')" class="dialogName" xid="h51"/>  
                  <span bind-text="ref('fLatestChatDate')" class="latestChatDate"
                    xid="span9"/>  
                  <div style="clear:both;" xid="div3"/>  
                  <span bind-html="ref('fLatestChat')" class="latestChat" xid="span10"/> 
                </div> 
              </li> 
            </ul> 
          </div> 
        </div>  
        <div class="x-content-center x-pull-up" xid="div7"> 
          <span class="x-pull-up-label" xid="span6">加载更多...</span> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
