<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window"
  sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:472px;top:72px;"
    onParamsReceive="modelParamsReceive"> 
    <div component="$UI/system/components/justep/data/data" xid="funcsData"
      idColumn="fID" autoLoad="false" limit="-1" confirmDelete="false" confirmRefresh="false"
      onCustomRefresh="funcsDataCustomRefresh"> 
      <column label="ID" name="fID" type="String" xid="default1"></column>
  <column label="功能图标" name="fIcon" type="String" xid="default2"></column>
  <column label="功能图标" name="fImgUrl" type="String" xid="xid4"></column>
  <column label="标题" name="fTitle" type="String" xid="default3"></column>
  <column label="功能url" name="fUrl" type="String" xid="default5"></column>
  <column label="process" name="fProcess" type="String" xid="xid1"></column>
  <column label="activity" name="fActivity" type="String" xid="xid2"></column>
  <data xid="default10">[]</data>
  <column name="fIsFunc" type="Boolean" xid="xid3"></column>
  <column name="selected" type="Boolean" xid="xid5"></column>
  <column name="fTitlePY" type="String" xid="xid6"></column>
  <column name="fIconColor" type="String" xid="xid7"></column></div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar" title="我的应用"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            xid="btnClose" onClick="{&quot;operation&quot;:&quot;window.close&quot;}"> 
            <i xid="i1"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">我的应用</div>  
        <div class="x-titlebar-right reverse" xid="div3"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon hide"
            xid="btnOK" icon="icon-checkmark-round" onClick="btnOKClick" bind-css="{hide:'runFunc'===mode.get()}"> 
            <i xid="i2" class="icon-checkmark-round"/>  
            <span xid="span2"/> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
        xid="panel2"> 
        <div class="x-panel-top" xid="top2"> 
          <div class="x-query-input x-flex"> 
            <i class="icon-android-search x-icon-lg"/>  
            <input type="text" class="x-flex1" data-bind="value:queryText,valueUpdate: 'input'"/>  
            <i class="icon-close-circled  x-icon-lg x-cls-filter hide" bind-css="{hide:!queryText.get()}"
              bind-click="clsQueryText"/> 
          </div> 
        </div>  
        <div class="x-panel-content" xid="content2"> 
          <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
            xid="funcs"> 
            <div class="x-content-center x-pull-down container" xid="div4"> 
              <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i7"/>  
              <span class="x-pull-down-label" xid="span6">下拉刷新...</span> 
            </div>  
            <div class="x-scroll-content" xid="div7"> 
              <div xid="funcsList" class="x-list" component="$UI/system/components/justep/list/list"
                data="funcsData" limit="20" filter="$model.funcFilter($row)"> 
                <ul class="x-list-template" style="padding-top:6px;"> 
                  <li class="media" style="padding-left:6px; padding-right:6px;"> 
                    <div bind-if="!val('fIsFunc')"> 
                      <div component="$UI/system/components/justep/output/output"
                        class="x-output x-title" xid="output1" bind-ref="ref('fTitle')"/> 
                    </div>  
                    <div bind-if="val('fIsFunc')" bind-css="{media:val('fIsFunc'),'x-currentRow':$object===$model.funcsData.getCurrentRow()}"> 
                      <div class="pull-left x-func-checkbox" bind-if="'selectFunc'===$model.mode.get()"> 
                        <span component="$UI/system/components/justep/button/checkbox"
                          class="x-checkbox" bind-ref="ref('selected')"/> 
                      </div>  
                      <div class="media-body" bind-click="rowClick"> 
                        <div class="media x-func-body"> 
                          <div class="x-blob x-blob-radius pull-left media-object x-func-icon"
                            bind-if="val('fImgUrl')" bind-visible="val('fImgUrl')"> 
                            <img class="x-blob-img x-autofill" bind-attr-src="$model.getImageUrl($object)"/> 
                          </div>  
                          <div class="x-blob x-blob-radius pull-left media-object x-func-icon"
                            bind-if="val('fIcon')" bind-visible="val('fIcon')"> 
                            <i bind-attr-class="val('fIcon')" style="font-size: 32px;" bind-style="{color:val('fIconColor')}"/> 
                          </div>  
                          <div class="media-body x-func-info-body"> 
                            <h4 class="media-heading" bind-text="ref('fTitle')"/>  
                            <div bind-text="ref('fContent')"/> 
                          </div> 
                        </div> 
                      </div> 
                    </div> 
                  </li> 
                </ul> 
              </div> 
            </div>  
            <div class="x-content-center x-pull-up" xid="div8"> 
              <span class="x-pull-up-label" xid="span7">加载更多...</span> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</div>
