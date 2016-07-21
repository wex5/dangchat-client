<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="$UI/chat/base/login.w" 
  __id="id_1" 
  design="device:pc;" 
  sysParam="false" 
  class="portal-login-page window" >

    <span component="$UI/system/components/justep/windowDialog/windowDialog" forceRefreshOnOpen="true" src="$UI/work/reg/registerActivity.m.w" xid="registerDialog" xui:parent="window" xui:update-mode="insert" />
    <span component="$UI/system/components/justep/windowDialog/windowDialog" src="$UI/work/reg/forgetPasswordActivity.w" xid="forgetDialog" xui:parent="window" xui:update-mode="insert" />
    <a class="btn btn-link" component="$UI/system/components/justep/button/button" label="新用户注册" onClick="{&quot;operation&quot;:&quot;registerDialog.open&quot;}" style="margin-top:-14px;" xid="registerBtn" xui:parent="fieldset" xui:update-mode="insert" >
<i xid="i2" />
<span xid="span2" >
新用户注册</span>
</a>
    <a class="btn btn-link pull-right" component="$UI/system/components/justep/button/button" label="忘记密码？" onClick="{&quot;operation&quot;:&quot;forgetDialog.open&quot;}" style="margin-top:-14px;" xid="fotgetBtn" xui:parent="fieldset" xui:update-mode="insert" >
<i xid="i2_4" />
<span xid="span2_4" >


忘记密码？</span>
</a>

</div>