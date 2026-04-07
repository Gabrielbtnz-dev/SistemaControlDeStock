package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.PersonDtoGet;
import com.sistema.sistema.Dto.PersonDtoPost;
import com.sistema.sistema.Service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestControllerPerson {

    private final PersonService personService;

    public RestControllerPerson(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/personas")
    public List<PersonDtoGet> getPerson(){
        return personService.getPerson();
    }

    @PostMapping("/addPerson")
    public ResponseEntity<String> postPerson(@RequestBody PersonDtoPost persondto){
        return personService.postPerson(persondto);
    }
}
