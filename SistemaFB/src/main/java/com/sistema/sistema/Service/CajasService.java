package com.sistema.sistema.Service;


import com.sistema.sistema.Domain.Cajas.Cajas;
import com.sistema.sistema.Dto.DtoCajas.CajasDto;
import com.sistema.sistema.Model.CajasRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class CajasService {

    private final CajasRepository paymedRepo;

    public CajasService(CajasRepository paymedRepo) {
        this.paymedRepo = paymedRepo;
    }

    public List<CajasDto> getMethodPaymed(){
        return paymedRepo.findAllByOrderByIdDesc().stream().map(
                m-> new CajasDto(
                        m.getId(),
                        m.getName(),
                        m.getMoneda(),
                        m.getSaldo(),
                        m.getActivo()
                )
        ).toList();
    }

    public ResponseEntity<?> postCuentasCajas(CajasDto dto){
        Cajas cajas = new Cajas();

        cajas.setName(dto.getName());
        cajas.setActivo(true);
        cajas.setMoneda(Moneda.PYG);
        cajas.setSaldo(BigDecimal.ZERO);

        paymedRepo.save(cajas);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Cuenta caja agregada correctamente",
                        "data", cajas.getId()
                ));
    }
}
