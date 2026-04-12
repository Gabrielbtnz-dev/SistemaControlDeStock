package com.sistema.sistema.Service;


import com.sistema.sistema.Domain.Person;
import com.sistema.sistema.Dto.PersonDtoGet;
import com.sistema.sistema.Dto.PersonDtoPost;
import com.sistema.sistema.Dto.PersonDtoUpdate;
import com.sistema.sistema.Model.PersonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PersonService {

    private final PersonRepository personReposi;

    public PersonService(PersonRepository personReposi) {
        this.personReposi = personReposi;
    }


    public List<PersonDtoGet> getPerson(){
        return personReposi.findAllByOrderByIdDesc().stream().map(
                p-> new PersonDtoGet(
                        p.getId(),
                        p.getNombre(),
                        p.getDocumento(),
                        p.getDigitoVerificador(),
                        p.getFuncionario(),
                        p.getCliente(),
                        p.getContribuyente(),
                        p.getActivo()
        ))
                .toList();
    }


    public ResponseEntity<Map<String, Object>> postPerson(PersonDtoPost dto) {
        Person person = new Person();
        person.setNombre(dto.getNombre());
        person.setDocumento(dto.getDocumento());
        person.setDigitoVerificador(dto.getDigitoVerificador());
        person.setFuncionario(dto.getFuncionario());
        person.setCliente(dto.getCliente());
        person.setContribuyente(dto.getContribuyente());
        personReposi.save(person);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Persona agregada correctamente",
                        "data", person.getId()
                ));

        /*
        {
          "nombre": "Juan Perez",
          "documento": "1234567",
          "digitoVerificador": "8",
          "funcionario": false,
          "cliente": true,
          "contribuyente": true
        }*/
    }

    public ResponseEntity<Map<String , Object>> updatePerson(Long id, PersonDtoUpdate dto){
      Person person =  personReposi.findById(id)
              .orElseThrow(()-> new RuntimeException("Persona no encontrada"));

      if (dto.getCliente() != null && !dto.getCliente().equals(person.getCliente())){
          person.setCliente(dto.getCliente());
      }

      if(dto.getActivo() != null && !dto.getActivo().equals(person.getActivo())){
          person.setActivo(dto.getActivo());
      }

      if(dto.getDocumento() != null && !dto.getDocumento().equalsIgnoreCase(person.getDocumento())){
          person.setDocumento(dto.getDocumento());
      }

      if(dto.getNombre() != null && !dto.getNombre().equals(person.getNombre())){
          person.setNombre(dto.getNombre());
      }

      personReposi.save(person);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Persona editado correctamente",
                        "data", person.getId()
                ));

    }


}
