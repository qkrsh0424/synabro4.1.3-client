import React from 'react';
import styled from "styled-components";
//Component
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`
    .title {
        font-size: 36px;
    }
`;


class PartnerCategoryBody extends React.Component {
    render() {
        const style = {
            paperHeader: {
                padding: "1rem",
                fontSize: "1.5rem"
            },
            paperBody: {
                padding: "1rem",
                fontSize: "1rem"
            },
            Grid: {
                padding: "8px"
            }
        };
        return (
            <Container className="container my-3 shadow-sm animate slideIn clearfix">
                <div style={style.Grid}>
                    <Grid container spacing={2}></Grid>
                    <Grid item xs={12} sm={12}>
                        <Paper style={style.paperHeader}>SPP</Paper>
                    </Grid>

                    <div
                        class="accordion md-accordion "
                        id="accordionEx"
                        role="tablist"
                        aria-multiselectable="true"
                    >
                        <div className="title my-2">상해봄 파트너 프로그램</div>
                        <div className="desc my-4">
                            안녕하세요 저희는 상해봄팀입니다! 상해봄 파트너 프로그램은
                            보머가 상해봄에서 게시글로 수익을 창출할 기회를 제공합니다.
                            보머는 작성글을 게재하는 광고로부터 수익을 창출 할수 있습니다.
                            보머의 계정에서 보머 파트너 프로그램 참여를 신청할 수
                            있습니다.
                                </div>

                        <div class="card">
                            <div class="card-header" role="tab" id="headingOne1">
                                <a
                                    data-toggle="collapse"
                                    data-parent="#accordionEx"
                                    href="#collapseOne1"
                                    aria-expanded="true"
                                    aria-controls="collapseOne1"
                                >
                                    <h5 class="mb-0">
                                        개요 <i class="fas fa-angle-down rotate-icon"></i>
                                    </h5>
                                </a>
                            </div>

                            <div
                                id="collapseOne1"
                                class="collapse"
                                role="tabpanel"
                                aria-labelledby="headingOne1"
                                data-parent="#accordionEx"
                            >
                                <div class="card-body">
                                    <p>
                                        저희는 중국내 한인들이 유용한 정보와 효율적인 정보교류를
                                        위해서 작성자들과 수익을 나누기로 결정하였습니다.
                                        </p>
                                    <p>
                                        이 프로그램을 통해서 저희 상해봄 커뮤니티가 여러분들의
                                        삶의 질을 향상시키기를 기원합니다.
                                        </p>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" role="tab" id="headingTwo2">
                                <a
                                    data-toggle="collapse"
                                    data-parent="#accordionEx"
                                    href="#collapseTwo2"
                                    aria-expanded="true"
                                    aria-controls="collapseTwo2"
                                >
                                    <h5 class="mb-0">
                                        수익 창출 방법{" "}
                                        <i class="fas fa-angle-down rotate-icon"></i>
                                    </h5>
                                </a>
                            </div>

                            <div
                                id="collapseTwo2"
                                class="collapse"
                                role="tabpanel"
                                aria-labelledby="headingTwo2"
                                data-parent="#accordionEx"
                            >
                                <div class="card-body">
                                    <p>
                                        채널에서 수익을 창출하도록 설정하면 게시글에 광고를 사용
                                        설정하여 수익을 창출할 수 있습니다. 광고는 상해봄 Ad
                                        Manager, 기타 상해봄 판매 소스를 통해 게재됩니다. 수익
                                        창출 게시글에 광고가 게재되는 방법을 자세히 알아보세요.
                                        </p>
                                    <p>
                                        상해봄 파트너 계약에 금액의 액수 또는 지급 여부에 대한
                                        보장 내용은 없습니다. 수익금은 시청자가 작성자의
                                        게시글을 볼 때 발생하는 광고 수익을 기준으로 발생합니다.
                                        조회수 혹은 좋아요가 늘수록 수익이 늘어나게 됩니다.
                                        </p>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" role="tab" id="headingThree3">
                                <a
                                    class="collapsed"
                                    data-toggle="collapse"
                                    data-parent="#accordionEx"
                                    href="#collapseThree3"
                                    aria-expanded="false"
                                    aria-controls="collapseThree3"
                                >
                                    <h5 class="mb-0">
                                        지급 방법 <i class="fas fa-angle-down rotate-icon"></i>
                                    </h5>
                                </a>
                            </div>

                            <div
                                id="collapseThree3"
                                class="collapse"
                                role="tabpanel"
                                aria-labelledby="headingThree3"
                                data-parent="#accordionEx"
                            >
                                <div class="card-body">
                                    <p>
                                        수입이 확정되면 모든 수익금이 상해봄 계정을 통해
                                        지급됩니다.
                                        </p>
                                    <p>
                                        지급을 받으려면 상해봄 계정에 로그인하여 지급 보류가
                                        모두 해결됐는지 확인해야 합니다.
                                        </p>
                                    <p>
                                        지급 보류가 해결된 경우 수입이 현지 지급 기준액에
                                        도달했을 때 지급이 됩니다. 다만 계정의 수익 창출이
                                        정지되지 않고 상해봄 정책을 준수해야 지급이 됩니다.
                                        </p>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header" role="tab" id="headingFour4">
                                <a
                                    class="collapsed"
                                    data-toggle="collapse"
                                    data-parent="#accordionEx"
                                    href="#collapseFour4"
                                    aria-expanded="false"
                                    aria-controls="collapseFour4"
                                >
                                    <h5 class="mb-0">
                                        지급 시기 <i class="fas fa-angle-down rotate-icon"></i>
                                    </h5>
                                </a>
                            </div>

                            <div
                                id="collapseFour4"
                                class="collapse"
                                role="tabpanel"
                                aria-labelledby="headingFour4"
                                data-parent="#accordionEx"
                            >
                                <div class="card-body">
                                    <p>
                                        상해봄 계정을 연결하고 다음 조건을 충족하면 수익금을
                                        받을 수 있습니다.
                                        </p>
                                    <ul>
                                        <li> 수익이 현지 지급 기준액에 도달함</li>
                                        <li> 계정에 지급 보류가 없음</li>
                                        <li> 계정의 수익 창출이 정지되지 않음</li>
                                        <li> 상해봄 수익 창출 정책을 준수함</li>
                                    </ul>
                                    <p>
                                        최종 수입은 다음 달 중순까지는 계좌로 이체되지 않습니다.
                                        즉, 6월에 발생한 수입은 7월 중순에 계좌로 이체됩니다.
                                        전월의 상해봄 최종 수입은 이번 달 10~14일에 상해봄의
                                        계정 잔액에 추가되며 총 잔액이 지급 기준액에 도달하고
                                        지급 보류가 설정되지 않은 경우 이번 달에 지급됩니다.
                                        예를 들어 상해에 거주하고 있고 6월 말에 잔액이 500위안을
                                        초과한다면 7월에 수익금이 지급됩니다.
                                        </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Accodian End */}
                    <p className="font-weight-bold py-4">
                        현재 상해봄 파트너 프로그램은 활성화 되지 않았습니다.
                        </p>
                </div>
            </Container>
        );
    }
}

export default PartnerCategoryBody;