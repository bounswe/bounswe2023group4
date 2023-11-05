package com.bounswe.predictionpolls.extensions

import junit.framework.TestCase.assertFalse
import junit.framework.TestCase.assertTrue
import org.junit.Test

class StringExtensionTest {
    @Test
    fun testIsValidEmail() {
        assertTrue("example@example.com".isValidEmail())
        assertTrue("john.doe+extension@example.co.uk".isValidEmail())
        assertFalse("example".isValidEmail())
        assertFalse("example@".isValidEmail())
        assertFalse("example@example".isValidEmail())
        assertFalse("example@example,com".isValidEmail())
    }

    @Test
    fun testIsValidDate() {
        assertTrue("01012020".isValidDate())
        assertTrue("31121999".isValidDate())
        assertFalse("010120".isValidDate())
        assertFalse("32121999".isValidDate())
        assertFalse("31131999".isValidDate())
        assertFalse("abcd1234".isValidDate())
    }
}