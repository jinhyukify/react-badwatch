var mapHero = {
	"리퍼": "reaper",
	"트레이서": "tracer",
	"메르시": "mercy",
	"한조": "hanzo",
	"토르비욘": "torbjon",
	"라인하르트": "reinhardt",
	"파라": "pharah",
	"윈스턴": "winston",
	"위도우메이커": "widowmaker",
	"바스티온": "bastion",
	"시메트라": "symmetra",
	"젠야타": "zenyatta",
	"겐지": "genji",
	"로드호그": "roadhog",
	"맥크리": "mccree",
	"정크랫": "junkrat",
	"자리야": "zarya",
	"솔저:76": "soldier",
	"루시우": "lucio",
	"디바": "dva",
	"메이": "mei",
	"아나": "ana"
};
var list_right_title = [
    "플레이 시간",
    "게임당 폭주시간",
    "게임당 원콤보 처치",
    "게임당 딜량",
    "한목숨 킬 최고기록",
    "한게임 딜 최고기록",
    "임무기여처치 최고기록",
    "임무기여시간 최고기록"
 ];

function hour_modify(hour)
{
	if(hour >= 1)
		return hour+" 시간";
	else
	{
		var minute = hour*60;
		if(minute >= 1)
			return Math.round(minute) + " 분";
		else 
		{
			var second = minute*60;
			return Math.round(second) + " 초";
		}
	}
}

function second_modify(second)
{
	if(second < 60)	
		return second + " 초";
	else
	{
		var minute = Math.floor(second/60);
		var seconds = second%60;
		if(minute < 60)
			return minute + "분 "+seconds.toFixed(0)+"초";
		else
		{
			var hour = Math.floor(minute/60);
			var minutes = minute%60;
			return hour+"시간 " + minutes + "분 "+seconds.toFixed(0)+"초";
		}
	}
}

function get_job_right_title(hero)
{
	switch(hero)
	{
		case "리퍼":
			return list_right_title.concat([
					"게임당 죽음의 꽃(Q)로 처치",
					"게임당 평균 거둔영혼",
					"죽음의 꽃(Q) 한게임 최고처치",
					"거둔영혼 한게임 최고기록"
				]);
		case "트레이서":
			return list_right_title.concat([
					"게임당 펄스폭탄(Q)로 처치",
					"게임당 펄스폭탄(Q)부착",
					"펄스폭탄(Q) 한게임 최고처치",
					"펄스폭탄(Q)부착 한게임 최고기록"
				]);
		case "메르시":
			return list_right_title.concat([
					"게임당 부활(Q)한 플레이어",
					"게임당 블라스터(2)으로 처치",
					"부활(Q)한 플레이어 한게임 최고기록",
					"블라스터(2) 한게임 최고처치",
					"치유(1) 한게임 최고기록"
				]);
		case "한조":
			return list_right_title.concat([
					"게임당 용의 일격(Q)로 처치",
					"게임당 갈래 화살(E)로 처치",
					"용의 일격(Q) 한게임 최고처치",
					"갈래 화살(Q) 한게임 최고처치",
					"처치시야지원(Shift) 한게임 최고기록"
				]);
		case "토르비욘":
			return list_right_title.concat([
					"게임당 생성한 방어구팩",
					"게임당 토르비욘이 직접처치",
					"게임당 포탑으로 처치",
					"게임당 초고열 용광로(Q)로 처치",
					"초고욜 용광로(Q) 한게임 최고처치"
				]);
		case "라인하르트":
			return list_right_title.concat([
					"게임당 막은피해(방벽)",
					"게임당 돌진(shift)으로 교통사고",
					"게임당 화염강타(E)로 처치",
					"게임당 대지분쇄(Q)로 처치",
					"막은피해(방벽) 한게임 최고기록"					
				]);
		case "파라":
			return list_right_title.concat([
					"게임당 로켓 명중",
					"게임당 포화(Q)로 처치",
					"로켓 명중 한게임 최고기록",
					"포화(Q) 한게임 최고처치"
				]);
		case "윈스턴":
			return list_right_title.concat([
					"게임당 밀쳐낸 플레이어(Q)",
					"게임당 막은피해(E)",
					"게임당 점프 팩(Shift)로 처치",
					"게임당 원시의 분노(Q)로 처치",
					"막은피해(E) 한게임 최고기록",
					"점프 팩(Shift) 한게임 최고처치",
					"원시의 분노(Q) 한게임 최고처치"
				]);
		case "위도우메이커":
			return list_right_title.concat([
					"게임당 맹독 지뢰(E)로 처치",
					"게임당 저격치명타",
					"저격명중률",
					"저격명중률 한게임 최고기록",
					"저격치명타 한게임 최고기록",
					"처치시야지원(Q) 한게임 최고기록"
				]);
		case "바스티온":
			return list_right_title.concat([
					"게임당 수색모드로 처치",
					"게임당 경계모드(Shift)로 처치",
					"게임당 전차모드(Q)로 처치",
					"수색모드 한게임 최고처치",
					"게임당 자가치유(E)",	
					"경계모드(Shift) 한게임 최고처치",
					"전차모드(Q) 한게임 최고처치"
				]);
		case "시메트라":
			return list_right_title.concat([
					"게임당 감시포탑(Shift)로 처치",
					"게임당 순간이동(Q)한 플레이어",
					"게임당 보호막 제공(E)",
					"게임당 순간이동기(Q) 가동시간",
					"순간이동(Q)한 플레이어 한게임 최고기록",
					"보호막(E)제공 한게임 최고기록",
					"순간이동기(Q) 가동시간 한게임 최고기록"
				]);
		case "젠야타":
			return list_right_title.concat([
					"게임당 초월(Q)로 치유",
					"초월(Q)로 치유 한게임 최고기록",
					"치유 한게임 최고기록"
				]);
		case "겐지":
			return list_right_title.concat([
					"게임당 용검(Q)으로 처치",
					"게임당 튕겨낸피해(E)",
					"게임당 근접 공격 결정타",
					"용검(Q) 한게임 최고처치",
					"튕겨낸피해(E) 한게임 최고기록"
				]);
		case "로드호그":
			return list_right_title.concat([
					"갈고리(Shift) 명중률",
					"게임당 갈고리(Shift)로 끌어오기",
					"게임당 돼재앙(Q)로 처치",
					"갈고리(Shift)명중률 한게임 최고기록",
					"갈고리(Shift)로 끌어오기 한게임 최고기록",
					"돼재앙(Q) 한게임 최고처치"
				]);
		case "맥크리":
			return list_right_title.concat([
					"게임당 황야의 무법자(Q)로 처치",
					"게임당 피스키퍼 난사(right)로 처치",
					"황야의무법자(Q) 한게임 최고처치",
					"피스키퍼 난사(right) 한게임 최고처치"
				]);
		case "정크랫":
			return list_right_title.concat([
					"게임당 덫(E)에 걸린 적",
					"게임당 죽이는 타이어(Q)로 처치",
					"덫(E)에 걸린 적 한게임 최고기록",
					"죽이는 타이어(Q) 한게임 최고처치"
				]);
		case "자리야":
			return list_right_title.concat([
					"게임당 막은피해(Shift)",
					"게임당 방벽씌우기(E)",
					"게임당 고에너지(right)로 처치",
					"게임당 중력탄(Q)으로 처치",
					"막은피해(Shift) 한게임 최고기록",
					"방벽씌우기(E) 한게임 최고기록",
					"고에너지(right) 한게임 최고처치",
					"중력탄(Q) 한게임 최고처치"
				]);
		case "솔저:76":
			return list_right_title.concat([
					"게임당 나선로켓(right)로 처치",
					"게임당 전술조준경(Q)로 처치",
					"게임당 생체장(E)으로 치유",
					"나선로켓(right) 한게임 최고처치",
					"전술조준경(Q) 한게임 최고처치"	
				]);
		case "루시우":
			return list_right_title.concat([
					"게임당 소리방벽(Q) 제공",
					"게임당 자가치유",
					"소리방벽(Q) 한게임 최고기록",
					"치유 한게임 최고기록"
				]);
		case "디바":
			return list_right_title.concat([
					"게임당 호출한 로봇",
					"게임당 자폭(Q)으로 처치",
					"게임당 막은피해(right)",
					"게임당 파괴된 로봇",
					"자폭(Q) 한게임 최고처치",
					"막은피해(right) 한게임 최고기록"
				]);
		case "메이":
			return list_right_title.concat([
					"게임당 얼린 적",
					"게임당 눈보라(Q)로 처치",
					"게임당 막은 피해(Shift)",
					"얼린 적 한게임 최고기록",
					"눈보라(Q) 한게임 최고처치",
					"막은 피해(Shift) 한게임 최고기록"
				]);
		case "아나":
			return list_right_title.concat([
					"게임당 나노강화제(Q) 주입",
					"게임당 재운적(Shift)",
					"소총명중률",
					"저격 명중률",
					"재운적(Shift) 한게임 최고기록"
				]);
	}
}

function get_job_right_value(quick_mode, hero, heroData)
{
	if(quick_mode)
	{
		// 빠른대전

		function per_game(data)
		{
			return heroData.quick_game_count == 0? 0: (data/heroData.quick_game_count).toFixed(1);
		}

		var list_right_value = [
			hour_modify(heroData.quick_playtime),
			second_modify(per_game(heroData.quick_flood_time)),
			per_game(heroData.quick_onecombo)+"킬",
			per_game(heroData.quick_deal),
			heroData.quick_best_kill_in_life+"킬",
			heroData.quick_best_deal_in_game,
			heroData.quick_best_mission_kill_in_game+"킬",
			second_modify(heroData.quick_best_mission_time_in_game)
		];

		

		switch(hero)
		{
			case "리퍼":
				return list_right_value.concat([
							per_game(heroData.quick_death_blossom_kill)+"킬",
							per_game(heroData.quick_soul_consumed)+"영혼",
							heroData.quick_most_death_blossom_kill+"킬",
							heroData.quick_most_soul_consumed+"영혼"
						]);
			case "트레이서":
				return list_right_value.concat([
						per_game(heroData.quick_pulse_bomb_kill)+"킬",
						per_game(heroData.quick_pulse_bomb_attached)+"개",
						heroData.quick_best_pulse_bomb_kill_in_game+"킬",
						heroData.quick_best_puls_bomb_attached_in_game+"개"
					]);
			case "메르시":
				return list_right_value.concat([
						per_game(heroData.quick_resurrected)+"명",
						per_game(heroData.quick_blaster_kill)+"킬",
						heroData.quick_best_resurrected_in_game+"명",
						heroData.quick_best_blaster_kill_in_game+"킬",
						heroData.quick_best_heal_in_game
					]);
			case "한조":
				return list_right_value.concat([
						per_game(heroData.quick_dragonstrike_kill)+"킬",
						per_game(heroData.quick_scatter_arrow_kill)+"킬",
						heroData.quick_best_dragonstrike_kill_in_game+"킬",
						heroData.quick_best_scatter_arrow_kill_in_game+"킬",
						heroData.quick_best_view_support_in_game+"회"
					]);
			case "토르비욘":
				return list_right_value.concat([
						per_game(heroData.quick_armor_pack_created)+"개",
						per_game(heroData.quick_torbjon_kill)+"킬",
						per_game(heroData.quick_turret_kill)+"킬",
						per_game(heroData.quick_molten_core_kill)+"킬",
						heroData.quick_best_molten_core_kill_in_game+"킬"
					]);
			case "라인하르트":
				return list_right_value.concat([
						per_game(heroData.quick_damage_blocked)+"막음",
						per_game(heroData.quick_charge_kill)+"킬",
						per_game(heroData.quick_fire_strike_kill)+"킬",
						per_game(heroData.quick_earthshatter_kill)+"킬",
						heroData.quick_best_damage_blocked_in_game+"막음"			
					]);
			case "파라":
				return list_right_value.concat([
						per_game(heroData.quick_rocket_hit),
						per_game(heroData.quick_barrage_kill)+"킬",
						heroData.quick_best_rocket_hit_in_game,
						heroData.quick_best_barrage_kill_in_game+"킬"
					]);
			case "윈스턴":
				return list_right_value.concat([
						per_game(heroData.quick_knocked_back)+"회",
						per_game(heroData.quick_damage_blocked)+"막음",
						per_game(heroData.quick_jump_pack_kill)+"킬",
						per_game(heroData.quick_primal_rage_kill)+"킬",
						heroData.quick_best_damage_blocked_in_game+"막음",
						heroData.quick_best_jump_pack_kill_in_game+"킬",
						heroData.quick_best_primal_rage_kill_in_game+"킬"
					]);
			case "위도우메이커":
				return list_right_value.concat([
						per_game(heroData.quick_venom_mine_kill)+"킬",
						per_game(heroData.quick_scoped_critical),
						heroData.quick_scoped_accuracy+"%",
						heroData.quick_best_scoped_accuracy_in_game+"%",
						heroData.quick_best_scoped_critical_in_game,
						heroData.quick_best_view_support_in_game+"회"
					]);
			case "바스티온":
				return list_right_value.concat([
						per_game(heroData.quick_recon_kill)+"킬",
						per_game(heroData.quick_sentry_kill)+"킬",
						per_game(heroData.quick_tank_kill)+"킬",
						heroData.quick_best_recon_kill_in_game+"킬",
						per_game(heroData.quick_self_heal),	
						heroData.quick_best_sentry_kill_in_game+"킬",
						heroData.quick_best_tank_kill_in_game+"킬"
					]);
			case "시메트라":
				return list_right_value.concat([
						per_game(heroData.quick_turret_kill)+"킬",
						per_game(heroData.quick_player_teleported)+"명",
						per_game(heroData.quick_shield_provided),
						second_modify(per_game(heroData.quick_teleport_uptime)),
						heroData.quick_best_player_teleported_in_game+"명",
						heroData.quick_best_shield_provided_in_game,
						second_modify(heroData.quick_best_teleport_uptime_in_game)
					]);
			case "젠야타":
				return list_right_value.concat([
						per_game(heroData.quick_transcendence_heal),
						heroData.quick_best_transcendence_heal,
						heroData.quick_best_heal_in_game
					]);
			case "겐지":
				return list_right_value.concat([
						per_game(heroData.quick_dragonblade_kill)+"킬",
						per_game(heroData.quick_damage_reflected),
						per_game(heroData.quick_melee_lastshot)+"킬",
						heroData.quick_best_dragonblade_kill_in_game+"킬",
						heroData.quick_best_damage_reflected_in_game
					]);
			case "로드호그":
				return list_right_value.concat([
						heroData.quick_hook_accuracy+"%",
						per_game(heroData.quick_hook)+"회",
						per_game(heroData.quick_wholehog_kill)+"킬",
						heroData.quick_best_hook_accuracy_in_game+"%",
						heroData.quick_best_hook_in_game+"회",
						heroData.quick_best_wholehog_kill_in_game+"킬"
					]);
			case "맥크리":
				return list_right_value.concat([
					    per_game(heroData.quick_deadeye_kill)+"킬",
						per_game(heroData.quick_fan_the_hammer_kill)+"킬",
						heroData.quick_best_deadeye_kill_in_game+"킬",
						heroData.quick_best_fan_the_hammer_kill_in_game+"킬"
					]);
			case "정크랫":
				return list_right_value.concat([
						per_game(heroData.quick_trapped_enemy)+"명",
						per_game(heroData.quick_riptire_kill)+"킬",
						heroData.quick_best_trapped_enemy_in_game+"명",
						heroData.quick_best_riptire_kill_in_game+"킬"
					]);
			case "자리야":
				return list_right_value.concat([
						per_game(heroData.quick_damage_blocked)+"막음",
						per_game(heroData.quick_barrier)+"회",
						per_game(heroData.quick_high_energy_kill)+"킬",
						per_game(heroData.quick_graviton_surge_kill)+"킬",
						heroData.quick_best_damage_blocked_in_game+"막음",
						heroData.quick_best_barrier_in_game+"회",
						heroData.quick_best_high_energy_kill_in_game+"킬",
						heroData.quick_best_graviton_kill_in_game+"킬"
					]);
			case "솔저:76":
				return list_right_value.concat([
						per_game(heroData.quick_helix_rocket_kill)+"킬",
						per_game(heroData.quick_tactical_visor_kill)+"킬",
						per_game(heroData.quick_biotic_field_heal),
						heroData.quick_best_helix_rocket_kill_in_game+"킬",
						heroData.quick_best_tactical_visor_kill_in_game	+"킬"
					]);
			case "루시우":
				return list_right_value.concat([
						per_game(heroData.quick_sound_barrier),
						per_game(heroData.quick_self_heal),
						heroData.quick_best_sound_barrier_in_game,
						heroData.quick_best_heal_in_game
					]);
			case "디바":
				return list_right_value.concat([
						per_game(heroData.quick_mech_called)+"회",
						per_game(heroData.quick_self_destruct_kill)+"킬",
						per_game(heroData.quick_damage_blocked)+"막음",
						per_game(heroData.quick_mech_destroyed),
						heroData.quick_best_self_destruct_kill+"킬",
						heroData.quick_best_damage_blocked_in_game+"막음"
					]);
			case "메이":
				return list_right_value.concat([
						per_game(heroData.quick_enemy_frozen)+"명",
						per_game(heroData.quick_blizzard_kill)+"킬",
						per_game(heroData.quick_damage_blocked)+"막음",
						heroData.quick_best_enemy_frozen_in_game+"명",
						heroData.quick_best_blizzard_kill_in_game+"킬",
						heroData.quick_best_damage_blocked_in_game+"막음"
					]);
			case "아나":
				return list_right_value.concat([
						per_game(heroData.quick_nano_boosts_applied),
						per_game(heroData.quick_enemy_slept)+"명",
						heroData.quick_unscoped_accuracy+"%",
						heroData.quick_scoped_accuracy+"%",
						heroData.quick_best_enemy_slept_in_game+"명"
					]);
		}
	}
	else
	{
		//경쟁전
		function per_game(data)
		{
			return heroData.rank_game_count == 0? 0: (data/heroData.rank_game_count).toFixed(1);
		}

		var list_right_value = [
		hour_modify(heroData.rank_playtime),
		second_modify(per_game(heroData.rank_flood_time)),
		per_game(heroData.rank_onecombo)+"킬",
		per_game(heroData.rank_deal),
		heroData.rank_best_kill_in_life+"킬",
		heroData.rank_best_deal_in_game,
		heroData.rank_best_mission_kill_in_game+"킬",
		second_modify(heroData.rank_best_mission_time_in_game)
		];
		switch(hero)
		{
			case "리퍼":
				return list_right_value.concat([
							per_game(heroData.rank_death_blossom_kill)+"킬",
							per_game(heroData.rank_soul_consumed)+"영혼",
							heroData.rank_most_death_blossom_kill+"킬",
							heroData.rank_most_soul_consumed+"영혼"
						]);
			case "트레이서":
				return list_right_value.concat([
						per_game(heroData.rank_pulse_bomb_kill)+"킬",
						per_game(heroData.rank_pulse_bomb_attached)+"개",
						heroData.rank_best_pulse_bomb_kill_in_game+"킬",
						heroData.rank_best_puls_bomb_attached_in_game+"개"
					]);
			case "메르시":
				return list_right_value.concat([
						per_game(heroData.rank_resurrected)+"명",
						per_game(heroData.rank_blaster_kill)+"킬",
						heroData.rank_best_resurrected_in_game+"명",
						heroData.rank_best_blaster_kill_in_game+"킬",
						heroData.rank_best_heal_in_game
					]);
			case "한조":
				return list_right_value.concat([
						per_game(heroData.rank_dragonstrike_kill)+"킬",
						per_game(heroData.rank_scatter_arrow_kill)+"킬",
						heroData.rank_best_dragonstrike_kill_in_game+"킬",
						heroData.rank_best_scatter_arrow_kill_in_game+"킬",
						heroData.rank_best_view_support_in_game+"회"
					]);
			case "토르비욘":
				return list_right_value.concat([
						per_game(heroData.rank_armor_pack_created)+"개",
						per_game(heroData.rank_torbjon_kill)+"킬",
						per_game(heroData.rank_turret_kill)+"킬",
						per_game(heroData.rank_molten_core_kill)+"킬",
						heroData.rank_best_molten_core_kill_in_game+"킬"
					]);
			case "라인하르트":
				return list_right_value.concat([
						per_game(heroData.rank_damage_blocked)+"막음",
						per_game(heroData.rank_charge_kill)+"킬",
						per_game(heroData.rank_fire_strike_kill)+"킬",
						per_game(heroData.rank_earthshatter_kill)+"킬",
						heroData.rank_best_damage_blocked_in_game+"막음"			
					]);
			case "파라":
				return list_right_value.concat([
						per_game(heroData.rank_rocket_hit),
						per_game(heroData.rank_barrage_kill)+"킬",
						heroData.rank_best_rocket_hit_in_game,
						heroData.rank_best_barrage_kill_in_game+"킬"
					]);
			case "윈스턴":
				return list_right_value.concat([
						per_game(heroData.rank_knocked_back)+"회",
						per_game(heroData.rank_damage_blocked)+"막음",
						per_game(heroData.rank_jump_pack_kill)+"킬",
						per_game(heroData.rank_primal_rage_kill)+"킬",
						heroData.rank_best_damage_blocked_in_game+"막음",
						heroData.rank_best_jump_pack_kill_in_game+"킬",
						heroData.rank_best_primal_rage_kill_in_game+"킬"
					]);
			case "위도우메이커":
				return list_right_value.concat([
						per_game(heroData.rank_venom_mine_kill)+"킬",
						per_game(heroData.rank_scoped_critical),
						heroData.rank_scoped_accuracy+"%",
						heroData.rank_best_scoped_accuracy_in_game+"%",
						heroData.rank_best_scoped_critical_in_game,
						heroData.rank_best_view_support_in_game+"회"
					]);
			case "바스티온":
				return list_right_value.concat([
						per_game(heroData.rank_recon_kill)+"킬",
						per_game(heroData.rank_sentry_kill)+"킬",
						per_game(heroData.rank_tank_kill)+"킬",
						heroData.rank_best_recon_kill_in_game+"킬",
						per_game(heroData.rank_self_heal),	
						heroData.rank_best_sentry_kill_in_game+"킬",
						heroData.rank_best_tank_kill_in_game+"킬"
					]);
			case "시메트라":
				return list_right_value.concat([
						per_game(heroData.rank_turret_kill)+"킬",
						per_game(heroData.rank_player_teleported)+"명",
						per_game(heroData.rank_shield_provided),
						second_modify(per_game(heroData.rank_teleport_uptime)),
						heroData.rank_best_player_teleported_in_game+"명",
						heroData.rank_best_shield_provided_in_game,
						second_modify(heroData.rank_best_teleport_uptime_in_game)
					]);
			case "젠야타":
				return list_right_value.concat([
						per_game(heroData.rank_transcendence_heal),
						heroData.rank_best_transcendence_heal,
						heroData.rank_best_heal_in_game
					]);
			case "겐지":
				return list_right_value.concat([
						per_game(heroData.rank_dragonblade_kill)+"킬",
						per_game(heroData.rank_damage_reflected),
						per_game(heroData.rank_melee_lastshot)+"킬",
						heroData.rank_best_dragonblade_kill_in_game+"킬",
						heroData.rank_best_damage_reflected_in_game
					]);
			case "로드호그":
				return list_right_value.concat([
						heroData.rank_hook_accuracy+"%",
						per_game(heroData.rank_hook)+"회",
						per_game(heroData.rank_wholehog_kill)+"킬",
						heroData.rank_best_hook_accuracy_in_game+"%",
						heroData.rank_best_hook_in_game+"회",
						heroData.rank_best_wholehog_kill_in_game+"킬"
					]);
			case "맥크리":
				return list_right_value.concat([
					    per_game(heroData.rank_deadeye_kill)+"킬",
						per_game(heroData.rank_fan_the_hammer_kill)+"킬",
						heroData.rank_best_deadeye_kill_in_game+"킬",
						heroData.rank_best_fan_the_hammer_kill_in_game+"킬"
					]);
			case "정크랫":
				return list_right_value.concat([
						per_game(heroData.rank_trapped_enemy)+"명",
						per_game(heroData.rank_riptire_kill)+"킬",
						heroData.rank_best_trapped_enemy_in_game+"명",
						heroData.rank_best_riptire_kill_in_game+"킬"
					]);
			case "자리야":
				return list_right_value.concat([
						per_game(heroData.rank_damage_blocked)+"막음",
						per_game(heroData.rank_barrier)+"회",
						per_game(heroData.rank_high_energy_kill)+"킬",
						per_game(heroData.rank_graviton_surge_kill)+"킬",
						heroData.rank_best_damage_blocked_in_game+"막음",
						heroData.rank_best_barrier_in_game+"회",
						heroData.rank_best_high_energy_kill_in_game+"킬",
						heroData.rank_best_graviton_kill_in_game+"킬"
					]);
			case "솔저:76":
				return list_right_value.concat([
						per_game(heroData.rank_helix_rocket_kill)+"킬",
						per_game(heroData.rank_tactical_visor_kill)+"킬",
						per_game(heroData.rank_biotic_field_heal),
						heroData.rank_best_helix_rocket_kill_in_game+"킬",
						heroData.rank_best_tactical_visor_kill_in_game+"킬"
					]);
			case "루시우":
				return list_right_value.concat([
						per_game(heroData.rank_sound_barrier),
						per_game(heroData.rank_self_heal),
						heroData.rank_best_sound_barrier_in_game,
						heroData.rank_best_heal_in_game
					]);
			case "디바":
				return list_right_value.concat([
						per_game(heroData.rank_mech_called)+"회",
						per_game(heroData.rank_self_destruct_kill)+"킬",
						per_game(heroData.rank_damage_blocked)+"막음",
						per_game(heroData.rank_mech_destroyed),
						heroData.rank_best_self_destruct_kill+"킬",
						heroData.rank_best_damage_blocked_in_game+"막음"
					]);
			case "메이":
				return list_right_value.concat([
						per_game(heroData.rank_enemy_frozen)+"명",
						per_game(heroData.rank_blizzard_kill)+"킬",
						per_game(heroData.rank_damage_blocked)+"막음",
						heroData.rank_best_enemy_frozen_in_game+"명",
						heroData.rank_best_blizzard_kill_in_game+"칼",
						heroData.rank_best_damage_blocked_in_game+"막음"
					]);
			case "아나":
				return list_right_value.concat([
						per_game(heroData.rank_nano_boosts_applied),
						per_game(heroData.rank_enemy_slept)+"명",
						heroData.rank_unscoped_accuracy+"%",
						heroData.rank_scoped_accuracy+"%",
						heroData.rank_best_enemy_slept_in_game+"명"
					]);
		}
	}
	
}
export { mapHero, get_job_right_title, get_job_right_value, hour_modify, second_modify };