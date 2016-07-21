import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.auth.client.AuthUtils;
//import com.justep.biz.client.Action;
import com.justep.biz.client.ActionResult;
import com.justep.biz.client.ActionUtils;
//import com.justep.biz.client.Callback;
import com.justep.cache.SystemCache;
import com.justep.message.ClientMessages;
import com.justep.ui.JProcessor;
import com.justep.ui.system.service.permission.ClassicPortalRequestWrapper;
import com.justep.ui.system.service.portal.LoginAction;
import com.justep.ui.util.UIUtils;


public class Login implements JProcessor {
	
	static Boolean useCache = false; //!SystemUtils.isDebug(); 权限变了缓存没清有问题

	public void execute(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {

		//hcr 支持oauth登录
		AuthUtils.loginAuthServer(response);
		
		String bsessionid = null;
		String sysCode = null;
		String orgVersion = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null){
			for (int i = 0; i < cookies.length; i++) {
			  String name = cookies[i].getName();
			  if(name.equals("bsessionid")){
				  bsessionid = cookies[i].getValue();
			  }
			}
		}
		
		if(bsessionid == null){
			ActionResult result = LoginAction.execute(request);
			if(result.isSuccess()){
				bsessionid = result.getBSessionID();
				sysCode = result.getSysCode();
				
				//get orgVersion
				List<Object> datas = result.getDatas();
				JSONObject resultParam = (JSONObject)datas.get(0);
				@SuppressWarnings("rawtypes")
				List values = (List)resultParam.get("value");
				orgVersion = (String)values.get(values.size()-1);				
			}else{
				JSONObject content = null;
				String code = result.getCode();
				if(ClientMessages.CON_ERROR1.equals(code)||ClientMessages.ACTION_ERROR1.equals(code)){
					content = new JSONObject();
					content.put("flag", false);
					content.put("message", result.getMessage());
				}else{
					content = (JSONObject)result.getContent();
				}
				response.setCharacterEncoding("UTF-8");
				response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
				OutputStream output = response.getOutputStream();
				output.write(content.toString().getBytes("UTF-8"));
				output.flush();
				output.close();
				return;
			}
		}	

		//同步人员到message
		//int num = update2actor();
		//ActionResult ActionEngine.invokeAction(Action action,  String accept, String bsessionID, String language, Callback callback)
		//获取actor返回的code
		String actorLoginCode = getActorLoginCode();
		
		//伪装参数, 获取上下文信息
		String useName = request.getParameter("username");
		String executor = request.getParameter("executor");
		JSONObject data;
		JSONObject context;
		
		if(useName==null || !useCache || !SystemCache.cache.containsKey(useName)){
			Map<String, String> params = new HashMap<String, String>();
			params.put("process", "/SA/OPM/system/systemProcess");
			params.put("activity", "mainActivity");
			if(executor != null)
				params.put("executor", executor);
			params.put("bsessionid", bsessionid);
			context = (JSONObject)UIUtils.getWindowContext(new ClassicPortalRequestWrapper(request, params), null, false);
			if(context.getBoolean("flag")){
				data = (JSONObject)context.get("data");
			}else{
				response.setCharacterEncoding("UTF-8");
				response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
				OutputStream output = response.getOutputStream();
				output.write(context.toString().getBytes("UTF-8"));
				output.flush();
				output.close();
				return;
			}
			
			//取系统注入代码
			context.put("sys", sysCode);
			context.put("bsessionid", bsessionid);
			//不能缓存
			data.put("bsessionid", bsessionid);
			data.put("orgVersion", orgVersion);
			data.put("actorLoginCode", actorLoginCode);
			
			response.setCharacterEncoding("UTF-8");
			response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
			PrintWriter out = response.getWriter();
			out.write(context.toString());
			out.flush();
			
			if(useCache && (useName != null)){
				context.put("sys", "__sysCode__");
				context.put("bsessionid", "__bsessionid__");
				data.put("bsessionid", "__bsessionid__");
				data.put("orgVersion", "__orgVersion__");		
				String ctx = context.toJSONString();
				SystemCache.cache.put(useName, ctx);
			}
			
		}else{
			String ctx = SystemCache.cache.get(useName);

			ctx = ctx.replace("__bsessionid__", bsessionid);
			if(sysCode != null){
				ctx = ctx.replace("__sysCode__", sysCode);
			}else{
				ctx = ctx.replace("__sysCode__", "");
			}
			if(orgVersion != null){
				ctx = ctx.replace("__orgVersion__", orgVersion);
			}else{
				ctx = ctx.replace("__orgVersion__", "");
			}

			response.setCharacterEncoding("UTF-8");
			response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
			PrintWriter out = response.getWriter();
			out.write(ctx);
			out.flush();
		}
	}
	
	//逻辑应该写在这里，目前实现在前端
	String getActorLoginCode(){
		return "";
	}

	int update2actor(String name){
		return 0;
	}
}
