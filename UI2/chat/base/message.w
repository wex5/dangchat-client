<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="main13" component="$UI/system/components/justep/window/window"
  design="device:mobile;" xid="window" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:363px;left:76px;"
    onModelConstructDone="modelModelConstructDone" onunLoad="modelUnLoad" onActive="modelActive"
    onInactive="modelInactive" onParamsReceive="modelParamsReceive" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="messageData" idColumn="fID"> 
      <column label="fID" name="fID" type="String" xid="xid7"/>  
      <column label="fSender" name="fSender" type="String" xid="xid8"/>  
      <column label="fImg" name="fImg" type="String" xid="xid9"/>  
      <column label="fContent" name="fContent" type="String" xid="xid10"/>  
      <column label="isOut" name="isOut" type="Boolean" xid="xid1"/>  
      <column label="fileUrl" name="fileUrl" type="String" xid="xid2"/>  
      <column label="fStyle" name="fStyle" type="String" xid="xid4"/>  
      <column label="fState" name="fState" type="String" xid="xid3"/>  
      <column label="fSenderPID" name="fSenderPID" type="String" xid="xid5"/>  
      <column label="fSenderTime" name="fSenderTime" type="String" xid="xid6"/>  
      <column label="fFileName" name="fFileName" type="String" xid="xid11"/>  
      <column label="fAttentionNum" name="fAttentionNum" type="String" xid="xid12"/>  
      <column label="fIsOwnSet" name="fIsOwnSet" type="String" xid="xid13"/>  
      <column label="fMessageText" name="fMessageText" type="String" xid="xid14"/>  
      <column label="fChecked" name="fChecked" type="String" xid="xid15"/> 
    </div> 
  </div>  
  <div component="$UI/system/components/justep/router/router" style="display:none;position:absolute;;left:215.0px;top:127.0px"
    xid="router" onRoute="routerRoute"/>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="popMenu" anchor="personal" opacity="0"> 
    <div class="x-popMenu-overlay" xid="div3"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu1"> 
      <li class="x-menu-item" xid="item2"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          xid="showPersonBtn" label="查看通讯录" onClick="showPersonClick"> 
          <i/>  
          <span>查看通讯录</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item1"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          xid="clearChatBtn" label="清除聊天记录" onClick="clearChatBtnClick"> 
          <i xid="i3"/>  
          <span xid="span3">清除聊天记录</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item13"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="搜索聊天信息" xid="searchText" onClick="searchTextClick"> 
          <i xid="i20"/>  
          <span xid="span17">搜索聊天信息</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item19"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="查看所有文档" xid="searchDoc" onClick="searchDocClick"> 
          <i xid="i28"/>  
          <span xid="span30">查看所有文档</span> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="groupPopMenu" anchor="group" opacity="0"> 
    <div class="x-popMenu-overlay" xid="div9"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu2"> 
      <li class="x-menu-item" xid="item3"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="查看群详细" xid="groupInfoBtn" onClick="groupInfoBtnClick"> 
          <i xid="i4"/>  
          <span xid="span4">查看群详细</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item4"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="清空聊天记录" xid="button2" onClick="clearChatBtnClick"> 
          <i xid="i6"/>  
          <span xid="span5">清空聊天记录</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item14"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="搜索聊天信息" xid="button3" onClick="searchTextClick"> 
          <i xid="i21"/>  
          <span xid="span23">搜索聊天信息</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item20"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="查看所有文档" xid="button4" onClick="searchDocClick"> 
          <i xid="i29"/>  
          <span xid="span31">查看所有文档</span> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    direction="right-bottom" xid="optionPopMenu" opacity="0" anchor="optionBtn"> 
    <div class="x-popMenu-overlay" xid="div20"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu4"> 
      <li class="x-menu-item" xid="item16"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="转发" xid="optionTransmitBtn" onClick="optionTransmitBtnClick"> 
          <i xid="i25"/>  
          <span xid="span27">转发</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item17"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="关注" xid="optionAttentionBtn" onClick="optionAttentionBtnClick"> 
          <i xid="i26"/>  
          <span xid="span28">关注</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item18"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="删除" xid="optionDelBtn" onClick="optionDelBtnClick"> 
          <i xid="i27"/>  
          <span xid="span29">删除</span> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <span component="$UI/system/components/justep/messageDialog/messageDialog"
    xid="messageDialog" type="YesNo" style="left:25px;top:163px;" onYes="messageDialogYes"/>  
  <span component="$UI/system/components/justep/messageDialog/messageDialog"
    xid="allMessageDialog" type="YesNo" onYes="allMessageDialogYes" style="left:23px;top:130px;"/>  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="transmitWindowDialog"
    showTitle="true" forceRefreshOnOpen="true" process="/SA/OPM/system/systemProcess"
    activity="mainActivity" style="top:46px;left:28px;"/>  
  <div component="$UI/system/components/justep/popMenu/popMenu" class="x-popMenu"
    xid="msgPopMenu" direction="auto" opacity="0" dismissible="false"> 
    <div class="x-popMenu-overlay" xid="div6" bind-click="msgPopMenuHideClick"/>  
    <ul component="$UI/system/components/justep/menu/menu" class="x-menu dropdown-menu x-popMenu-content"
      xid="menu3"> 
      <li class="x-menu-item" xid="item6"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="复制" xid="copyBtn" onClick="copyBtnClick" bind-css="{'x-display' : isText}"> 
          <i xid="i10"/>  
          <span xid="span9">复制</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item7"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="引用" xid="quoteBtn" bind-css="{'x-display' : isText}" onClick="quoteBtnClick"> 
          <i xid="i11"/>  
          <span xid="span10">引用</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item8"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="转发" xid="transmitBtn" onClick="transmitBtnClick" bind-css="{&quot;x-display&quot;:isAudio}"> 
          <i xid="i12"/>  
          <span xid="span11">转发</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item9"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="@" xid="aBtn" onClick="aBtnClick"> 
          <i xid="i13"/>  
          <span xid="span12">@</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item11" bind-if="isAttentionBtnShow"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="关注" xid="attentionBtn" onClick="attentionBtnClick"> 
          <i xid="i15"/>  
          <span xid="span14">关注</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item12" bind-click="item12Click" bind-ifnot="isAttentionBtnShow"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="取消关注" xid="removeAttentionBtn"> 
          <i xid="i19"/>  
          <span xid="span22">取消关注</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item5"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="删除" xid="deleteMsgBtn" onClick="deleteMsgBtnClick"> 
          <i xid="i9"/>  
          <span xid="span8">删除</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item10"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="保存到相册" xid="saveBtn" onClick="saveToAlbumBtnClick" bind-css="{'x-item-hide' : $model.imageItemHideForApp.get()}"> 
          <i/>  
          <span>保存到相册</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item11"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="下载" xid="saveBtn" onClick="saveBtnClick" bind-css="{'x-item-hide' : $model.imageItemHideForBrowser.get()}"> 
          <i xid="i14"/>  
          <span xid="span13">下载</span> 
        </a> 
      </li>  
      <li class="x-menu-item" xid="item15"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="更多" xid="moreBtn" onClick="moreBtnClick"> 
          <i xid="i22"/>  
          <span xid="span24">更多</span> 
        </a> 
      </li> 
    </ul> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full x-cards"
    xid="panel"> 
    <div class="x-panel-top" xid="top1" style="z-index:1;"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar o-top"
        xid="titleBar1"> 
        <div class="x-titlebar-left " xid="left1" style="white-space:nowrap;"
          bind-click="closeOrCancelClick"> 
          <div xid="cancelMoreStateDiv" bind-if="$model.more.get()" class="x-moreClass"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-close"
              label="button" xid="cancel" icon="icon-close"> 
              <i xid="i23" class="icon-android-close icon-close"/>  
              <span xid="span25"/> 
            </a> 
          </div>  
          <div xid="div17" bind-ifnot="$model.more.get()"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-close"
              label="button" xid="closeBtn" icon="icon-arrow-left-c"> 
              <i xid="i1" class="icon-arrow-left-c" style="font-size:larger;"/>  
              <span xid="span1"/> 
            </a> 
          </div>  
          <div component="$UI/system/components/justep/output/output" class="form-control input-sm o-name"
            xid="name" bind-text="status"/> 
        </div>  
        <div class="x-titlebar-title " xid="title1" style="text-align: center;"> 
          <div component="$UI/system/components/justep/output/output" class="form-control input-sm o-name"
            xid="typing" style="padding-top: 3px;text-align:-webkit-right;" bind-text="typingText"/> 
        </div>  
        <div class="x-titlebar-right reverse" xid="right1"> 
          <div xid="div18" bind-if="$model.more.get()" class="x-moreClass"> 
            <a component="$UI/system/components/justep/button/button" class="btn btn-link"
              label="选项" xid="optionBtn" onClick="optionBtnClick"> 
              <i xid="i24"/>  
              <span xid="span26">选项</span> 
            </a> 
          </div>  
          <div xid="div19" bind-ifnot="$model.more.get()"> 
            <a component="$UI/system/components/justep/button/button" style="display:none;"
              class="btn btn-link btn-only-icon x-detail" label="button" xid="personal"
              icon="icon-person" onClick="personalClick" bind-visible="false"> 
              <i xid="i2" class="icon-person"/>  
              <span xid="span2"/> 
            </a>  
            <a component="$UI/system/components/justep/button/button" style="display:none;"
              class="btn btn-link btn-only-icon x-detail" label="button" xid="group"
              icon="icon-person-stalker" onClick="groupClick" bind-visible="false"> 
              <i xid="i5" class="icon-person-stalker"/>  
              <span xid="span6"/> 
            </a> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="msgListContent" bind-touchend="msgListContentTouchend"> 
      <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
        xid="msgScrollView" onPullDown="msgScrollViewPullDown" pullDownMoveLabel=""
        pullDownLabel="" autoPullUp="false"> 
        <div class="x-content-center x-pull-down" xid="div5"> 
          <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i7"/>  
          <span class="x-pull-down-label" xid="span15">加载更多...</span> 
        </div>  
        <div class="x-scroll-content" xid="scrollHeight"> 
          <div component="$UI/system/components/justep/list/list" class="x-list"
            xid="msgList" data="messageData" disablePullToRefresh="true" disableInfiniteLoad="true"
            onAfterRender="msgListAfterRender"> 
            <ul class="x-list-template" xid="listTemplateUl1" style="margin:5px;"> 
              <li xid="li1"> 
                <div bind-if="val('fStyle') === 'service'"> 
                  <div class="text-info text-center" bind-html="ref('fContent')"/> 
                </div>  
                <div bind-if="val('fStyle') !== 'service'"> 
                  <div class="media" bind-if="val('isOut') != true" bind-click="mediaClick"> 
                    <div xid="div2" class="media-left" style="padding:0px;"> 
                      <div component="$UI/system/components/justep/row/row"
                        class="x-row x-row-center" xid="row1"> 
                        <div class="x-col x-col-fixed" xid="col1" style="width:auto;padding:0px;"
                          bind-if="$model.more.get()"> 
                          <span component="$UI/system/components/justep/button/checkbox"
                            class="x-checkbox" xid="checkbox1" checkedValue="1" uncheckedValue="0"
                            bind-ref="ref(&quot;fChecked&quot;)"/> 
                        </div>  
                        <div class="x-col" xid="col2" bind-click="contactInfo"> 
                          <img alt="" class="o-img" bind-attr-src="$model.getImageUrl(val('fImg'))"
                            xid="image6"/> 
                        </div> 
                      </div> 
                    </div>  
                    <div xid="div1" class="media-body o-messageBox1"> 
                      <div xid="div12" bind-ifnot="$model.isGroupChat"> 
                        <div xid="div13" bind-text=" val(&quot;fSenderTime&quot;)" class="x-senderTime"/>  
                        <div xid="div11" class="x-attention" bind-if=" val(&quot;fIsOwnSet&quot;)"> 
                          <i xid="i17" class="icon-heart"/>  
                          <span xid="span18" bind-text="&quot;+&quot;+val(&quot;fAttentionNum&quot;)"
                            class="x-attentionNum" style="top:-2px;"/> 
                        </div> 
                      </div>  
                      <div bind-if="$model.isGroupChat"> 
                        <div xid="senderName" bind-text="val(&quot;fSender&quot;)" class="x-senderName"/>  
                        <div xid="messageTime" bind-text=" val(&quot;fSenderTime&quot;)"
                          class="x-messageTime" style="display:none;"/>  
                        <span xid="span21" class="x-messageTime" bind-text=" val(&quot;fSenderTime&quot;)"/>  
                        <div xid="div10" class="x-attention" bind-if=" val(&quot;fIsOwnSet&quot;)"> 
                          <i xid="i16" class="icon-heart"/>  
                          <span xid="span19" bind-text="&quot;+&quot; + val(&quot;fAttentionNum&quot;)"
                            class="x-attentionNum" style="top:-2px;;"/> 
                        </div> 
                      </div>  
                      <div bind-if=" val(&quot;fStyle&quot;)===&quot;photo&quot;&amp;&amp;!val(&quot;fileUrl&quot;)"> 
                        <div class="icon-loading-a x-leftPhotoState"/> 
                      </div>  
                      <div xid="senderText" style="position:relative;clear:left"> 
                        <img src="./img/tb1.png" alt="" xid="image" class="o-icon"/>  
                        <span xid="other" class="msgContent" bind-html="ref('fContent')"
                          bind-css="{photoMsg:val('fStyle') === 'photo',audioMsg:val('fStyle') === 'audio',videoMsg:val('fStyle') === 'video',&quot;x-touch&quot;: $model.row_touch.get()===$object}"
                          bind-touchstart="touchStart" oncontextmenu="return false;"
                          bind-touchmove="touchMove"
                          bind-touchcancel="touchEnd"
                          bind-touchend="touchEnd" bind-mouseup="rightClick"/> 
                      </div> 
                    </div> 
                  </div>  
                  <div class="media" bind-if="val('isOut')" bind-click="mediaClick"> 
                    <div xid="div5" class="media-body text-right o-messageBox2"> 
                      <div xid="div14" bind-text=" val(&quot;fSenderTime&quot;)" class="x-ownSenderMessageTime"/>  
                      <i bind-css="{'icon-loading-c':val(&quot;fState&quot;)===&quot;pending&quot;,'icon-checkmark':val(&quot;fState&quot;)===&quot;sent&quot;||val(&quot;fState&quot;)===&quot;received&quot;||val(&quot;fState&quot;)===&quot;read&quot;,'x-recvied':val(&quot;fState&quot;)===&quot;recevied&quot;,'x-read':val(&quot;fState&quot;)===&quot;read&quot;,'icon-alert x-error':val(&quot;fState&quot;)===&quot;error&quot;}"
                        class="x-state"/>  
                      <div xid="div8" class="x-attention" bind-if=" val(&quot;fIsOwnSet&quot;)"> 
                        <i xid="i18" class="icon-heart" style="float:right;"/>  
                        <span xid="span20" bind-text=" val(&quot;fAttentionNum&quot;)+&quot;+&quot;"
                          class="x-attentionNum"/> 
                      </div>  
                      <div bind-if="val(&quot;fStyle&quot;)===&quot;photo&quot;&amp;&amp;!val(&quot;fileUrl&quot;) "> 
                        <div class="icon-loading-a x-rightPhotoState"/> 
                      </div>  
                      <div style="position:relative;clear:right;"> 
                        <img src="./img/tb2.png" alt="" xid="image3" class="o-icon"/>  
                        <span xid="me" class="text-left msgContent" bind-html="ref('fContent')"
                          bind-css="{photoMsg:val('fStyle') === 'photo',audioMsg:val('fStyle') === 'audio',videoMsg:val('fStyle') === 'video',&quot;x-touch&quot;: $model.row_touch.get()===$object}"
                          bind-mouseup="rightClick" oncontextmenu="return false;"
                          bind-touchmove="touchMove"
                          bind-touchcancel="touchEnd"
                          bind-touchstart="touchStart" bind-touchend="touchEnd"/> 
                      </div> 
                    </div>  
                    <div xid="div4" class="media-right"> 
                      <div component="$UI/system/components/justep/row/row"
                        class="x-row x-row-center" xid="row2" style="padding:0px;"> 
                        <div class="x-col" xid="col4"> 
                          <img alt="" class="o-img" bind-attr-src="$model.getImageUrl(val(&quot;fImg&quot;))"
                            xid="image1"/> 
                        </div>  
                        <div class="x-col x-col-fixed" xid="col5" style="width:auto;padding:0px;"
                          bind-if="$model.more.get()"> 
                          <span component="$UI/system/components/justep/button/checkbox"
                            class="x-checkbox" xid="checkbox2" checkedValue="1" uncheckedValue="0"
                            bind-ref="ref(&quot;fChecked&quot;)"/> 
                        </div> 
                      </div> 
                    </div> 
                  </div> 
                </div> 
              </li> 
            </ul> 
          </div> 
        </div>  
        <div class="x-content-center x-pull-up" xid="div7" style="display:none;"> 
          <span class="x-pull-up-label" xid="span16">加载更多...</span> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1" height="58"/> 
  </div>  
  <div component="../lib/superInput/superInput" xid="superinput" class="x-superinput"
    onSend="okBtnClick" onFinishRecVoice="superInputFinishRecVoice"> 
    <div class="x-flex x-superinput-area" xid="superinputArea"> 
      <div class="x-superinput-left"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-btn-attachment"
          label="" icon="glyphicon glyphicon-paperclip"> 
          <i class="glyphicon glyphicon-paperclip"/>  
          <span/> 
        </a> 
      </div>  
      <div xid="prScrn" class="x-superinput-left x-item-hide x-btn-prScrn"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon "
          label="" icon="iconfont icon-jianqie"> 
          <i class="iconfont icon-jianqie"/>  
          <span/> 
        </a> 
      </div>  
      <div class="x-flex1 x-input-area" style="overflow:auto"> 
        <div class="x-input-content" contenteditable="true"/>  
        <div class="x-voice-info hide"> 
          <i class="x-voice-recording icon-loading-b"/>  
          <span class="x-voice-recording-time">正在录音...</span>  
          <span class="x-voice-info-text"> 
            <i class="icon-arrow-left-a"/>滑过来取消录音
          </span> 
        </div> 
      </div>  
      <div class="x-superinput-right" xid="emojiRightBtn"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-btn-emoji"
          label="" icon="iconfont icon-jianpan2"> 
          <i class="iconfont icon-jianpan2"/>  
          <span/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-btn-voice"
          label="" icon="iconfont icon-voice" style="margin-top:-6px"> 
          <i class="iconfont icon-voice"/>  
          <span/> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon x-btn-send hide"
          label="" icon="iconfont icon-right"> 
          <i class="iconfont icon-right"/>  
          <span/> 
        </a> 
      </div> 
    </div>  
    <div class="x-superinput-emoji x-flex x-flex-column x-emoji-hide" xid="superinputEmoji"> 
      <div class="x-superinput-emoji-contents x-flex1"> 
        <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
          routable="false"> 
          <div class="x-contents-content" xid="attachment"> 
            <div class="x-superinput-attachment container-fluid "> 
              <div class="row grid"> 
                <div class="col cell col-xs-3 col-md-2 text-center"> 
                  <div class="x-fileInput"> 
                    <input type="file" multiple="true" xid="photoInput" accept="image/*,doc/-"/> 
                  </div>  
                  <i class="iconfont icon-chakantupian x-file"/>  
                  <h5 class="text-muted text-center"><![CDATA[图片 ]]></h5> 
                </div>  
                <div class="col cell col-xs-3 col-md-2 text-center"> 
                  <div class="x-fileInput"> 
                    <input type="file" multiple="false" xid="audioInput" accept="audio/*,doc/-"/> 
                  </div>  
                  <i class="iconfont icon-shengyin5 x-file"/>  
                  <h5 class="text-muted text-center"><![CDATA[声音 ]]></h5> 
                </div>  
                <div class="col cell col-xs-3 col-md-2 text-center"> 
                  <div class="x-fileInput"> 
                    <input type="file" multiple="false" xid="videoInput" accept="video/*,doc/-"/> 
                  </div>  
                  <i class="iconfont icon-shipin1 x-file"/>  
                  <h5 class="text-muted text-center"><![CDATA[视频 ]]></h5> 
                </div>  
                <div class="col cell col-xs-3 col-md-2 text-center"> 
                  <div class="x-fileInput"> 
                    <input type="file" multiple="false" xid="fileInput" accept="*/*"/> 
                  </div>  
                  <i class="iconfont icon-wenjianjia x-file"/>  
                  <h5 class="text-muted text-center"><![CDATA[文件 ]]></h5> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div>  
      <div class="x-superinput-emoji-title"> 
        <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group x-card btn-group-justified"
          tabbed="true" xid="buttonGroup1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default"
            label="附件" xid="attachmentBtn" target="attachment"> 
            <i xid="i8"/>  
            <span xid="span7"/> 
          </a> 
        </div> 
      </div> 
    </div> 
  </div>  
  <div xid="pswp" class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> 
    <div class="pswp__bg"/>  
    <div class="pswp__scroll-wrap"> 
      <div class="pswp__container"> 
        <div class="pswp__item"/>  
        <div class="pswp__item"/>  
        <div class="pswp__item"/> 
      </div>  
      <div class="pswp__ui pswp__ui--hidden"> 
        <div class="pswp__top-bar"> 
          <div class="pswp__counter"/>  
          <button class="pswp__button pswp__button--close" title="关闭"/>  
          <button class="pswp__button pswp__button--zoom" title="放大/缩小"/>  
          <div class="pswp__preloader"> 
            <div class="pswp__preloader__icn"> 
              <div class="pswp__preloader__cut"> 
                <div class="pswp__preloader__donut"/> 
              </div> 
            </div> 
          </div> 
        </div>  
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> 
          <div class="pswp__share-tooltip"/> 
        </div>  
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"/>  
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"/>  
        <div class="pswp__caption"> 
          <div class="pswp__caption__center"/> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
