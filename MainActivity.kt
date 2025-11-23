
package com.aurelia.webview
import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.aurelia.webview.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val web = binding.webview
        web.settings.javaScriptEnabled = true
        web.webViewClient = WebViewClient()
        web.webChromeClient = WebChromeClient()
        // Load local asset (the webapp folder copied into assets/www)
        web.loadUrl("file:///android_asset/www/index.html")
        // Expose a simple bridge for native to call JS
        web.addJavascriptInterface(object {
            @android.webkit.JavascriptInterface fun unlock() { runOnUiThread { web.evaluateJavascript("window.Aurelia.unlockPremium()", null) } }
            @android.webkit.JavascriptInterface fun isPremium() { runOnUiThread { web.evaluateJavascript("window.Aurelia.isPremium()", null) } }
        }, "AureliaBridge")
    }
}
