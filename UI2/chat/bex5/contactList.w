<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" sysParam="false">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:284px;left:177px;"
    onLoad="modelLoad"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div class="x-query-input x-flex"> 
        <i class="icon-android-search x-icon-lg"/>  
        <input type="text" class="x-flex1" data-bind="value:filterText,valueUpdate: 'input'"/>  
        <i class="icon-close-circled  x-icon-lg x-cls-filter hide" bind-css="{hide:!filterText.get()}"
          bind-click="clsfilterText"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div class="x-org-list-content x-full"> 
        <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
          xid="scrollView" pullDownLabel="加载..." pullDownMoveLabel="松开加载..." pullUpLabel="加载..."
          pullUpMoveLabel="松开加载..."> 
          <div class="x-content-center x-pull-down" xid="div6"> 
            <i class="x-pull-down-img glyphicon x-icon-pull-down"/>  
            <span class="x-pull-down-label" xid="span1">加载...</span> 
          </div>  
          <div class="x-scroll-content" xid="orgListContent"> 
            <div class="x-foreach" data-bind="foreach:{data: getList(),afterRender:afterRender()}"> 
              <div class="media x-margintop" data-bind="if:$object.isGroup,css:{'x-currentRow':$object==$model.currentRow.get()}"> 
                <div component="$UI/system/components/justep/row/row" class="x-row x-nopadding"
                  xid="row2" bind-click="groupListClick"> 
                  <div class="x-col x-col-fixed x-col-center" xid="col4" style="width:auto; "
                    bind-if="$model.isFromDlg.get()"> 
                    <span component="$UI/system/components/justep/button/checkbox"
                      class="x-checkbox" xid="checkbox2" bind-ref="checkRow" checkedValue="1"
                      uncheckedValue="0"/> 
                  </div>  
                  <div class="x-col x-col-center" xid="col5"> 
                    <div class="media-body"> 
                      <div class="media"> 
                        <div class="x-blob pull-left media-object x-org-image"> 
                          <img class="x-blob-img x-autofill" bind-attr-src="fImg"/> 
                        </div>  
                        <div class="media-body"> 
                          <h4 class="media-heading" bind-text="sName"/>  
                          <div bind-text="sAbout" style="overflow:hidden;text-overflow:ellipsis;width:200px;white-space:nowrap;"/> 
                        </div> 
                      </div> 
                    </div> 
                  </div> 
                </div> 
              </div>  
              <div data-bind="if:!$object.isGroup"> 
                <div data-bind="css:{media:$object.isTitle},if:$object.isTitle,attr:{flag:sName}" xid="deptName" bind-click="deptNameClick"> 
                  <div data-bind="if:!$object.isGroup"> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output x-title" xid="output1" bind-ref="sName"/> 
                  </div>  
                  <!-- 
                  	<div data-bind="if:$object.isGroup"> 
                    <div component="$UI/system/components/justep/output/output"
                      class="x-output x-title" xid="output1" bind-ref="sName">
                      <i class="icon-android-add"/>
                    </div> 
                  </div> 
                   --> 
                
  </div>  
                <div data-bind="css:{media:!$object.isTitle,'x-currentRow':$object==$model.currentRow.get()},if:!$object.isTitle"> 
                  <div component="$UI/system/components/justep/row/row" class="x-row x-nopadding"
                    xid="row3" bind-click="contactInfoClick"> 
                    <div class="x-col x-col-fixed x-col-center" xid="col7"
                      style="width:auto;" bind-if="$model.isFromDlg.get()"> 
                      <span component="$UI/system/components/justep/button/checkbox"
                        class="x-checkbox" xid="checkbox3" bind-ref="checkRow" checkedValue="1"
                        uncheckedValue="0"/> 
                    </div>  
                    <div class="x-col x-col-center" xid="col8"> 
                      <div class="media-body"> 
                        <div class="media"> 
                          <div class="x-blob x-blob-radius pull-left media-object x-org-image"
                            component="$UI/system/components/justep/org/orgImage"
                            xid="orgImage1" bind-ref="sFID" onCreateURL="orgImage1CreateURL"> 
                            <div class="x-blob-bar" xid="div4"> 
                              <i class="x-blob-edit icon-compose" xid="i1"/>  
                              <i class="x-blob-del icon-close-round" xid="i2"/> 
                            </div>  
                            <img class="x-blob-img x-autofill" xid="image1"/> 
                          </div>  
                          <div class="media-body"> 
                            <h4 class="media-heading" bind-text="sName"/>  
                            <div bind-text="sFName"/> 
                          </div> 
                        </div> 
                      </div> 
                    </div> 
                  </div> 
                </div> 
              </div> 
            </div> 
          </div>  
          <div class="x-content-center x-pull-up" xid="div7"> 
            <span class="x-pull-up-label" xid="span2"/> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div xid="div1" style="position:absolute;bottom:0px;width:100%;display:none;" bind-visible="$model.isFromDlg.get()">
      <a component="$UI/system/components/justep/button/button" class="btn btn-default"
        xid="sendBtn" style="background-color: rgb(75,115,164);width:100%;" label="确定"
        onClick="sendBtnClick"> 
        <i xid="i4"/>  
        <span xid="span4">确定</span>
      </a>
    </div>
  </div> 
</div>
