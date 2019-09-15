package com.gitee.taven.myselfdemo.service;


import com.gitee.taven.myselfdemo.dto.OrderDTO;
import com.gitee.taven.myselfdemo.entity.SaasHouse;
import com.gitee.taven.myselfdemo.entity.TssHouse;

public interface OrderService {
    /**
     * 添加订单，从Tss库从往Saas库调用
     * @return
     */
    OrderDTO queryInfo();
    Integer updateSaas(SaasHouse saasHouse);
    Integer updateTss(TssHouse tssHouse);
}
