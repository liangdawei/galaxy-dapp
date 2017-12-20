pragma solidity 0.4.18;

//星河金服 收付邦平台 智能合约
contract RecptPmtStates {

  struct Invoice {
    bytes32 no; //发票号码
    bytes32 code; //发票代码
    uint amount; //发票金额
    string payer; //买方
    string payee; //卖方
    uint issuedDate; //开票日期
    uint paymentDate; //付款日期
  }

  Invoice[] invoices;

  //添加发票
  function addInvoice(
    bytes32 _no,
    bytes32 _code,
    uint _amount,
    string _payer,
    string _payee,
    uint _issuedDate,
    uint _paymentDate
  )
    public
    returns (uint)
  {
    Invoice memory invoice = Invoice({
      no: _no,
      code: _code,
      amount: _amount,
      payer: _payer,
      payee: _payee,
      issuedDate: _issuedDate,
      paymentDate: _paymentDate
    });

    uint index = invoices.push(invoice) - 1;
    return index;
  }

  //获取发票数组长度
  function getInvoicesLength() public returns (uint) {
    return invoices.length;
  }

  //通过下标获取发票信息
  function getInvoice(
      uint _index
    )
    public
    returns (
      bytes32 no,
      bytes32 code,
      uint amount,
      string payer,
      string payee,
      uint issuedDate,
      uint paymentDate
    )
  {
    Invoice storage invoice = invoices[_index];

    no = invoice.no;
    code = invoice.code;
    amount = invoice.amount;
    payer = invoice.payer;
    payee = invoice.payee;
    issuedDate = invoice.issuedDate;
    paymentDate = invoice.paymentDate;
  }

}
