package com.bounswe.predictionpolls.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import com.bounswe.predictionpolls.R

val MontserratFontFamily = FontFamily(
    Font(R.font.montserrat_thin, FontWeight.W100),
    Font(R.font.montserrat_thin_italic, FontWeight.W100, FontStyle.Italic),
    Font(R.font.montserrat_extra_light, FontWeight.W200),
    Font(R.font.montserrat_extra_light_italic, FontWeight.W200, FontStyle.Italic),
    Font(R.font.montserrat_light, FontWeight.W300),
    Font(R.font.montserrat_light_italic, FontWeight.W300, FontStyle.Italic),
    Font(R.font.montserrat_regular, FontWeight.W400),
    Font(R.font.montserrat_italic, FontWeight.W400, FontStyle.Italic),
    Font(R.font.montserrat_medium, FontWeight.W500),
    Font(R.font.montserrat_medium_italic, FontWeight.W500, FontStyle.Italic),
    Font(R.font.montserrat_semi_bold, FontWeight.W600),
    Font(R.font.montserrat_semi_bold_italic, FontWeight.W600, FontStyle.Italic),
    Font(R.font.montserrat_bold, FontWeight.W700),
    Font(R.font.montserrat_bold_italic, FontWeight.W700, FontStyle.Italic),
    Font(R.font.montserrat_extra_bold, FontWeight.W800),
    Font(R.font.montserrat_extra_bold_italic, FontWeight.W800, FontStyle.Italic),
    Font(R.font.montserrat_black, FontWeight.W900),
    Font(R.font.montserrat_black_italic, FontWeight.W900, FontStyle.Italic),
)

val Typography = Typography(
    displayLarge = TextStyle(
        fontFamily = MontserratFontFamily
    ),
    displayMedium = TextStyle(
        fontFamily = MontserratFontFamily
    ),
    displaySmall = TextStyle(
        fontFamily = MontserratFontFamily
    ),
    headlineLarge = TextStyle(
        fontFamily = MontserratFontFamily
    ),
    headlineMedium = TextStyle(
        fontFamily = MontserratFontFamily
    ),
    headlineSmall = TextStyle(
        fontFamily = MontserratFontFamily
    ),
    titleLarge = TextStyle(
        fontFamily = MontserratFontFamily
    ),
    titleMedium = TextStyle(
        fontFamily = MontserratFontFamily
    ),
    titleSmall = TextStyle(
        fontFamily = MontserratFontFamily
    ),
    bodyLarge = TextStyle(
        fontFamily = MontserratFontFamily,
    ),
    bodyMedium = TextStyle(
        fontFamily = MontserratFontFamily,
    ),
    bodySmall = TextStyle(
        fontFamily = MontserratFontFamily,
    ),
    labelLarge = TextStyle(
        fontFamily = MontserratFontFamily,
    ),
    labelMedium = TextStyle(
        fontFamily = MontserratFontFamily,
    ),
    labelSmall = TextStyle(
        fontFamily = MontserratFontFamily,
    ),
)