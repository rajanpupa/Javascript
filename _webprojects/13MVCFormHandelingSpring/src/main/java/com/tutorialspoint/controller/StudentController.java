package com.tutorialspoint.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.tutorialspoint.model.Student;

@Controller
public class StudentController {

   @RequestMapping(value = {"/", "/student"}, method = RequestMethod.GET)
   public ModelAndView student() {
      return new ModelAndView("student", "command", new Student());
   }
   
   @RequestMapping(value = "/addStudent", method = RequestMethod.POST)
   public String addStudent(@ModelAttribute("SpringWeb")Student student, ModelMap model) {
      model.addAttribute("name", student.getName());
      model.addAttribute("age", student.getAge());
      model.addAttribute("id", student.getId());
      
      return "result";
   }
   
   @RequestMapping(value="/addStudentAjax", method = RequestMethod.POST)
   public @ResponseBody String addStudentAjax(@RequestBody Student student){
	   String responseString = "The student " + student.getName() + " has been added to the system";
	   // database calls could be done from here.
	   System.out.println(responseString);
	   
	   return responseString;
   }
   
   @RequestMapping(value="/test", method = RequestMethod.GET)
   public @ResponseBody String test(){
	   return "Hello test";
   }
}
