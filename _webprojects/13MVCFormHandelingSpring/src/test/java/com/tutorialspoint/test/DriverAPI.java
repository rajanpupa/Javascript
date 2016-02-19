package com.tutorialspoint.test;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class DriverAPI {
	
	String baseUrl = "http://localhost:9080/";
	
	public DriverAPI(){}
	public DriverAPI(String baseUrl){
		this.baseUrl = baseUrl;
	}
	
	WebDriver driver = new FirefoxDriver();
	
	public DriverAPI openUrl(String url){
		driver.get(baseUrl + url);
		return this;
	}
	
	public DriverAPI sendKeys(String keys, String id){
		driver.findElement(By.id(id)).sendKeys(keys);
		return this;
	}
	
	public DriverAPI click(String id){
		driver.findElement(By.id(id)).click();
		return this;
	}
	
	public void close(){
		driver.quit();
	}
	
	public DriverAPI saveScreen(String fileName) throws IOException{
		File srcFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
		File dst = new File(fileName);
		FileUtils.copyFile(srcFile, dst);
		System.out.println("File copied to " + dst.getCanonicalPath());
		return this;
	}
	
	public DriverAPI waitForSome(long timeout) throws InterruptedException{
		driver.wait(timeout);
		return this;
	}
}
