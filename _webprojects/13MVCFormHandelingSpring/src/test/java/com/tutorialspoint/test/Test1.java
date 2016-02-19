package com.tutorialspoint.test;

import static org.junit.Assert.*;

import java.io.IOException;

import org.junit.Test;


public class Test1 {

	@Test
	public void test() {
		//fail("Not yet implemented");
		DriverAPI driver = new DriverAPI("http://localhost:9080/sample-webapp1/");
		
		try {
			driver.openUrl("")
				.sendKeys("Rajan", "name")
				.sendKeys("25", "age")
				.sendKeys("1", "id")
				.saveScreen("images/screen1.png")
				.click("sub-button")
				.saveScreen("images/screen2.png")
				;
		} catch (IOException e) {
			e.printStackTrace();
			fail(e.getMessage());
		}
		
		driver.close();
	}

}
