package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoCajas.CajasDto;
import com.sistema.sistema.Service.CajasService.CajasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RestControllerCajas {

    private final CajasService cajasService;

    public RestControllerCajas(CajasService cajasService) {
        this.cajasService = cajasService;
    }

    @GetMapping("/cuentasCajas")
    public List<CajasDto> getMethodOfPaymed(){
        return cajasService.getMethodPaymed();
    }

    @PostMapping("/addCuentasCajas")
    public ResponseEntity<?> postCuentasCajas(@RequestBody CajasDto dto){
        return cajasService.postCuentasCajas(dto);
    }

    @DeleteMapping("/deleteCuentasCajas/{id}")
    public ResponseEntity<?> deleteCuentasCajas(@PathVariable Long id){
        return cajasService.deleteCuentasCajas(id);
    }
}
