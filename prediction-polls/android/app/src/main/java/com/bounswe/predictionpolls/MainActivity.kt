package com.bounswe.predictionpolls

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.rememberNavController
import com.bounswe.predictionpolls.ui.main.MAIN_ROUTE
import com.bounswe.predictionpolls.ui.main.mainScreen
import com.bounswe.predictionpolls.ui.theme.PredictionPollsTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PredictionPollsTheme {
                val navController = rememberNavController()
                NavHost(navController = navController, startDestination = MAIN_ROUTE) {
                    mainScreen()
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    PredictionPollsTheme {
        Greeting("Android")
    }
}