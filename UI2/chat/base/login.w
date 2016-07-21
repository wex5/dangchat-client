<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window portal-login-page" component="$UI/system/components/justep/window/window"
  sysParam="false" design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:375px;top:39px;"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="loginData" idColumn="id"> 
      <column label="手机号" name="phone" type="String" xid="xid1"/>  
      <column label="验证码" name="code" type="String" xid="xid2"/>  
      <column label="id" name="id" type="String" xid="xid3"/>  
      <data xid="default1">[{"phone":"","id":"1"}]</data>
    </div>
  </div>  
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver"
    xid="receiver" style="left:19px;top:14px;"/>
  <div class="page-login"> 
    <div class="page-header" style="text-align: center;font-size: 24px; margin-top:0; padding-top: 24px;"> 
      <div class="form-container" align="center">登录铛铛 </div> 
    </div>  
    <div class="page-body" style="padding: 10px;"> 
      <div class="form-container" style="max-width: 420px;margin: 0 auto;padding: 0 15px;" bind-keypress="div1Keypress"> 
        <form class="form-horizontal ng-pristine ng-valid"> 
          <fieldset xid="fieldset"> 
            <div class="form-group"> 
              <div class="input-group"> 
                <span class="input-group-addon"> 
                  <span class="glyphicon glyphicon-envelope"/> 
                </span>  
                <input component="$UI/system/components/justep/input/input" class="form-control"
                  xid="name" bind-ref="$model.loginData.ref(&quot;phone&quot;)" placeHolder="登录名"/> 
              </div> 
            </div>  
            <div class="form-group"> 
              <div class="input-group"> 
                <span class="input-group-addon"> 
                  <span class="glyphicon glyphicon-lock"/> 
                </span>  
                <input component="$UI/system/components/justep/input/password"
                  class="form-control" xid="password" placeHolder="密码" bind-ref="$model.loginData.ref('code')"/> 
              </div> 
            </div>  
            <div class="form-group"> 
              <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-block"
                label="登录" xid="login" onClick="loginBtnClick"> 
                <i xid="i1"/>  
                <span xid="span1">登录</span> 
              </a> 
            </div>  
            </fieldset> 
        </form> 
      </div> 
    </div> 
  </div> 
</div>
