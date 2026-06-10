package com.sistema.sistema.Service.RegistroFinancieroService;

import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Domain.Person.Person;
import com.sistema.sistema.Domain.ResgistroFinanciero.RegistroFinanciero;
import com.sistema.sistema.Dto.DtoRegistroFinanciero.RegistroFinancieroDtoPost;
import com.sistema.sistema.Model.CajasRepository;
import com.sistema.sistema.Model.MovimientoDeCajasRepository;
import com.sistema.sistema.Model.PersonRepository;
import com.sistema.sistema.Model.RegistroFinancieroRepository;
import com.sistema.sistema.Service.Enum.Moneda;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class RegistroFinancieroService {

    private final RegistroFinancieroRepository registroFinancieroRepository;
    private final PersonRepository personRepository;
    private final CajasRepository cajasRepository;
    private final MovimientoDeCajasRepository movimientoDeCajasRepository;

    public RegistroFinancieroService(RegistroFinancieroRepository registroFinancieroRepository, PersonRepository personRepository, CajasRepository cajasRepository, MovimientoDeCajasRepository movimientoDeCajasRepository) {
        this.registroFinancieroRepository = registroFinancieroRepository;
        this.personRepository = personRepository;
        this.cajasRepository = cajasRepository;
        this.movimientoDeCajasRepository = movimientoDeCajasRepository;
    }

    public ResponseEntity<?> addRegistroFinancieroIngreso(RegistroFinancieroDtoPost dto){

        RegistroFinanciero registro = new RegistroFinanciero();

        registro.setContado(true);
        registro.setFechaEmison(dto.getFechaEmison());
        registro.setMoneda(Moneda.PYG);
        registro.setObservacion("Registro Financiero");
        registro.setTipoOperacion("INGRESO");
        registro.setValor(dto.getValor());
        Person person = personRepository.findById(dto.getIdPerson())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));
        registro.setPerson(person);

        registroFinancieroRepository.save(registro);

        for (MovimientoDeCaja c : dto.getCajas()) {
            c.setRegistroFinanciero(registro);
        }


        List<Long> ids = new ArrayList<>();

        for(MovimientoDeCaja c : dto.getCajas()){
            ids.add(c.getId());
        }

        List<MovimientoDeCaja> existentes = cajasRepository.findByIdIn(ids);

        if(existentes.size() != ids.size()){
          return  ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "success", false,
                            "message", "Hay cajas enviadas que no existen en la base de datos"
                    ));
        }



        return  ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of(
                        "success", true,
                        "message", "Registro financiero guardado correctamente"
                ));

    }
}
