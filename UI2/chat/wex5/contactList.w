<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  design="device:m;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:217px;left:130px;"
    onModelConstructDone="modelModelConstructDone"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="contactListData" idColumn="fID"> 
      <column name="fID" type="String" xid="xid1"></column>
  <column name="fSpersonID" type="String" xid="xid2"></column>
  <column name="fIsGroup" type="String" xid="xid3"></column>
  <column name="fsfName" type="String" xid="xid4"></column>
  <column name="fsName" type="String" xid="xid5"></column>
  <column name="fSabout" type="String" xid="xid6"></column>
  <column name="fCheckRow" type="String" xid="xid7"></column>
  <column name="fsFID" type="String" xid="xid8"></column>
  <column name="sChineseFirstPY" type="String" xid="xid9"></column>
  <column name="type" type="String" xid="xid10"></column>
  <column name="fImg" type="String" xid="xid11"></column></div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div class="x-query-input x-flex"> 
        <i class="icon-android-search x-icon-lg"/>  
        <input type="text" class="x-flex1" data-bind="value:filterVal,valueUpdate: 'input'"/>  
        <i class="icon-close-circled  x-icon-lg x-cls-filter hide" bind-click="clsfilterText"
          bind-css="{hide:!filterVal.get()}"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1" _xid="C71F8591ECD00001DFB21C30EB001A71"> 
      <div component="$UI/system/components/justep/list/list" class="x-list "
        xid="list1" data="contactListData" limit="-1" filter="$model.contactListFilter($row)"> 
        <ul class="x-list-template  list-group" xid="listTemplateUl1"> 
          <li xid="contact" bind-ifnot="$model.isCreateGroup.get() &amp;&amp;( val(&quot;type&quot;)=='group' ||  val(&quot;fsName&quot;)=='群组')"> 
            <div xid="div5"> 
              <div xid="deptName" bind-if="val(&quot;fIsGroup&quot;)" bind-click="deptNameClick"> 
                <div xid="div6"> 
                  <div component="$UI/system/components/justep/output/output"
                    class="x-output x-title" xid="output1" bind-ref="ref(&quot;fsName&quot;)"/> 
                </div> 
              </div>  
              <div xid="div7" bind-ifnot=" val(&quot;fIsGroup&quot;)" bind-visible='!($model.isFromDlg.get()  &amp;&amp;$model.currentPersonID.get()== val("fSpersonID"))'> 
                <div component="$UI/system/components/justep/row/row" class="x-row x-nopadding"
                  xid="row3"> 
                  <div class="x-col x-col-fixed x-col-center" xid="col7" style="width:auto;"
                    bind-if="$model.isFromDlg.get()"> 
                    <span component="$UI/system/components/justep/button/checkbox"
                      class="x-checkbox" xid="checkbox" bind-ref="ref(&quot;fCheckRow&quot;)"
                      checkedValue="1" uncheckedValue="0" onChange="checkboxChange"/> 
                  </div>  
                  <div class="x-col x-col-center" xid="col8" bind-click="contactInfoClick"> 
                    <div class="media-body" xid="mediaBody3"> 
                      <div class="media" xid="media2"> 
                        <div xid="div9" class="x-blob x-blob-radius pull-left media-object x-org-image"> 
                          <div xid="div2" class="photoDiv" style="width:48px;height:48px;" bind-visible='!val("fImg")'> 
                            <span xid="span1" style="line-height:48px;" bind-text="(val(&quot;fsName&quot;).indexOf(&quot;(&quot;) == -1)?( val(&quot;fsName&quot;).slice(-2)):(val(&quot;fsName&quot;).indexOf(&quot;(&quot;) &lt;4 ? val(&quot;fsName&quot;) :val(&quot;fsName&quot;).slice(0,3))"/> 
                          </div> 
                        <div xid="div3" class="photoDiv" style="width:48px;height:48px;" bind-visible=' val("fImg")'>
   <img src="" alt="" xid="image1" class="o-img" bind-attr-src=' val("fImg")'></img></div></div>  
                        <div class="media-body" xid="mediaBody4"> 
                          <h4 class="media-heading" xid="h42" bind-text="val(&quot;fsName&quot;)"/>  
                          <div bind-text=" val(&quot;fsfName&quot;)" xid="div8"/> 
                        </div> 
                      </div> 
                    </div> 
                  </div> 
                </div> 
              </div> 
            </div> 
          </li> 
        </ul> 
      </div> 
    </div>  
    <div xid="div1" style="position:absolute;bottom:0px;width:100%;display:none;" bind-visible="$model.isFromDlg.get()"> 
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="sendBtn" style="width:100%;" label="确定"
        onClick="sendBtnClick"> 
        <i xid="i4"/>  
        <span xid="span4">确定</span> 
      </a> 
    </div> 
  </div>  
  <resource xid="resource2">
    <require xid="require1" url="css!$UI/work/common/css/pub"/>
  </resource>
</div>
