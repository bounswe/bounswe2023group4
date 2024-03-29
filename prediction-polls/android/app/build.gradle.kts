import com.android.build.gradle.internal.cxx.configure.gradleLocalProperties

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.devtools.ksp")
    id("com.google.dagger.hilt.android")
}

android {
    namespace = "com.bounswe.predictionpolls"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.bounswe.predictionpolls"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        debug {
            applicationIdSuffix = ".debug"
            isMinifyEnabled = false
            buildConfigField("String", "BASE_URL", gradleLocalProperties(rootDir).getProperty("base_url"))
            buildConfigField("String", "GOOGLE_CLIENT_ID", gradleLocalProperties(rootDir).getProperty("google_client_id"))
        }
        create("staging") {
            applicationIdSuffix = ".staging"
            isMinifyEnabled = true
            signingConfig = signingConfigs.getByName("debug")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            buildConfigField("String", "BASE_URL", gradleLocalProperties(rootDir).getProperty("base_url"))
            buildConfigField("String", "GOOGLE_CLIENT_ID", gradleLocalProperties(rootDir).getProperty("google_client_id"))
        }
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            buildConfigField("String", "BASE_URL", gradleLocalProperties(rootDir).getProperty("base_url"))
            buildConfigField("String", "GOOGLE_CLIENT_ID", gradleLocalProperties(rootDir).getProperty("google_client_id"))
            signingConfig = signingConfigs.getByName("debug")
        }
    }
    compileOptions {
        isCoreLibraryDesugaringEnabled = true
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.3"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.9.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.6.2")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.6.2")

    implementation("androidx.activity:activity-compose:1.8.0")
    implementation(platform("androidx.compose:compose-bom:2023.10.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")

    // Navigation
    val navVersion = "2.7.4"
    implementation("androidx.navigation:navigation-compose:$navVersion")
    implementation("androidx.hilt:hilt-navigation-compose:1.0.0")

    // Testing
    testImplementation("org.mockito:mockito-core:5.3.1")
    testImplementation("org.mockito:mockito-inline:5.2.0")
    testImplementation("org.mockito.kotlin:mockito-kotlin:5.1.0")
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.6.4")
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
    androidTestImplementation(platform("androidx.compose:compose-bom:2023.10.00"))

    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")

    // Dagger Hilt
    implementation("com.google.dagger:hilt-android:2.48.1")
    ksp("com.google.dagger:hilt-compiler:2.48.1")

    // For instrumentation tests Dagger hilt
    androidTestImplementation("com.google.dagger:hilt-android-testing:2.48.1")
    androidTestAnnotationProcessor("com.google.dagger:hilt-compiler:2.48.1")

    // For local unit tests Dagger hilt
    testImplementation("com.google.dagger:hilt-android-testing:2.48.1")
    testAnnotationProcessor("com.google.dagger:hilt-compiler:2.48.1")

    // OkHttp
    implementation("com.squareup.okhttp3:okhttp:4.9.0")

    // Gson
    implementation("com.google.code.gson:gson:2.8.9")

    // Chucker
    debugImplementation("com.github.chuckerteam.chucker:library:3.5.2")
    releaseImplementation("com.github.chuckerteam.chucker:library-no-op:3.5.2")

    // Retrofit
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")

    // Coil
    implementation("io.coil-kt:coil-compose:2.4.0")

    // Easy Google Login
    implementation("com.github.stevdza-san:OneTapCompose:1.0.9")

    // Immutable Kotlin Collections
    // Used for creating stable domain classes. Check stability meaning in terms of compose if you do not know what I mean.
    implementation("org.jetbrains.kotlinx:kotlinx-collections-immutable:0.3.6")

    // For date transformation
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.0.3")
}