package com.sistema.sistema.Service;


import com.sistema.sistema.Domain.Person;
import com.sistema.sistema.Dto.PersonDtoGet;
import com.sistema.sistema.Dto.PersonDtoPost;
import com.sistema.sistema.Model.PersonRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PersonService {

    private final PersonRepository personReposi;

    public PersonService(PersonRepository personReposi) {
        this.personReposi = personReposi;
    }


    public List<PersonDtoGet> getPerson(){
        return personReposi.findAll().stream().map(
                p-> new PersonDtoGet(
                        p.getId(),
                        p.getNombre(),
                        p.getDocumento(),
                        p.getDigitoVerificador(),
                        p.getFuncionario(),
                        p.getCliente(),
                        p.getContribuyente()
        ))
                .toList();
    }


    public ResponseEntity<String> postPerson(PersonDtoPost dto){
            Person person = new Person();
            person.setNombre(dto.getNombre());
            person.setDocumento(dto.getDocumento());
            person.setDigitoVerificador(dto.getDigitoVerificador());
            person.setFuncionario(dto.getFuncionario());
            person.setCliente(dto.getCliente());
            person.setContribuyente(dto.getContribuyente());
            personReposi.save(person);
        return ResponseEntity.ok("Cliente agregado con exito");

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


}
