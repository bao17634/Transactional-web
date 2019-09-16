package com.byr.myselfdemo.service;

import com.byr.myselfdemo.dto.OrderDTO;
import com.byr.myselfdemo.entity.SaasHouse;
import com.byr.myselfdemo.entity.TssHouse;

public interface OrderService {
    /**
     * 添加订单，从Tss库从往Saas库调用
     * @return
     */
    OrderDTO queryInfo();
    Integer updateSaas(SaasHouse saasHouse);
    Integer updateTss(TssHouse tssHouse);
}
